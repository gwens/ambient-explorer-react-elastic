import React from 'react';
import Header from './Header';
import SearchBar from './SearchBar';
import Results from './Results';
import Viewer from './Viewer';

class App extends React.Component {
  constructor() {
    super();
    this.fetchEmailsFromEs = this.fetchEmailsFromEs.bind(this);
    this.setSearchString = this.setSearchString.bind(this);
    this.setDateFilters = this.setDateFilters.bind(this);
    this.selectEmail = this.selectEmail.bind(this);
    this.clearEmailSelection = this.clearEmailSelection.bind(this);
    this.nextPage = this.nextPage.bind(this);
    this.prevPage = this.prevPage.bind(this);
    this.setPage = this.setPage.bind(this);
    // Get initial state
    this.state = {
      hits: 0,
      emails: {},
      searchString: "",
      dateFilters: {
        yearFrom: "1994",
        yearTo: "2017",
        monthFrom: "01",
        monthTo: "12"
      },
      selectedEmail: null, // Holds the email to be displayed in the viewer
      currentPage: 1
    };
    // Get emails from elasticsearch
    this.resultsPerPage = 25;
    this.fetchEmailsFromEs();
  }

  // Gets emails from elasticsearch and sets them in state
  fetchEmailsFromEs() {
    const searchString = this.state.searchString;
    const dateFilters = this.state.dateFilters;
    const elasticUrl = "http://localhost:9200/emails/_search"
    // Default query for no search term, returns all documents

    // Partial query for matching all if no search term
    const matchAll = [{"match_all" : {}}];
    // Full query for matching a string if a search term exists
    const matchString = [
      { "bool": {
        "should": [
          { "match": { "subject": {"query": `${searchString}`, "boost": 2} } },
          { "match": { "sender": { "query": `${searchString}`, "boost": 1.5 } } },
          { "match": { "content": `${searchString}` } }
        ]
      }}];
    const matchQuery = searchString.length > 2 ? matchString : matchAll;

    // Pagination
    const from = (this.state.currentPage - 1) * this.resultsPerPage;

    // Combined elasticsearch with date filters, max 1000 results returned
    const query = {
      "from": from,
      "size": this.resultsPerPage,
      "sort": [ 
        {"_score": {"order": "desc"}},
        {"id.raw": {"order": "asc"}} 
      ],
      "query": {
        "bool": {
          "filter": {
              "range": {
                "id": {
                  "gte": `amb_${dateFilters.yearFrom}_${dateFilters.monthFrom}`,
                  "lte": `amb_${dateFilters.yearTo}_${dateFilters.monthTo}`,
                  "format": "'amb_'yyyy'_'mm"
                  }
              } 
          },
          "must": matchQuery
        }
      }
    }

    fetch(elasticUrl, {
      method: 'POST', 
      body: JSON.stringify(query), 
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    }).then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then(response => {
      let results = {};
      response.hits.hits.map(hit => {
        let email = hit._source;
        email.score = hit._score;
        let id = hit._source.id;
        results[`${id}`] = email;
      });
      const emails = Object.assign(results);
      // Record the total hits, to control pagination
      this.setState({ hits: response.hits.total });
      // And set the emails into state
      this.setState({ emails });
    });
  }

  setSearchString(searchString){
    // Fetch new emails as a callback once setState is finished
    this.setState({ searchString }, () => { 
      this.fetchEmailsFromEs() 
      // Reset to page 1 for new search results
      this.setPage(1)
    });
  }

  setDateFilters(filters){
    // Create a copy of the current state first... 
    // Spread operator not working in new build config, need to figure out Babel?
    //const dateFilters = {...filters};
    //this.setState({ dateFilters });
    // Replacing spread with Object.assign (works as object is only one level deep)
    const dateFilters = Object.assign({}, filters);
    // Fetch emails as callback only once date filters are set
    this.setState({ dateFilters }, () => { this.fetchEmailsFromEs() });
  }

  selectEmail(id){
    this.setState({ selectedEmail: id });
  }

  clearEmailSelection(){
    this.setState({ selectedEmail: null });
  }

  nextPage(){
    let currentPage = this.state.currentPage;
    currentPage++; // Need to figure out if you're on the last page or not, but do this in Results
    this.setState( { currentPage }, () => { this.fetchEmailsFromEs() });
  }

  prevPage(){
    let currentPage = this.state.currentPage;
    currentPage--;
    this.setState( { currentPage }, () => { this.fetchEmailsFromEs() });
  }

  setPage(x) {
    let currentPage = this.state.currentPage;
    currentPage = x;
    this.setState( { currentPage }, () => { this.fetchEmailsFromEs() });
  }

  render() {
    return (
      <div className="navigator">
        <Header />
        <SearchBar setSearchString={this.setSearchString} dateFilters={this.state.dateFilters} setDateFilters={this.setDateFilters} clearEmailSelection={this.clearEmailSelection} setPage={this.setPage}/>
        <Results emails={this.state.emails} selectEmail={this.selectEmail} currentPage={this.state.currentPage} nextPage={this.nextPage} prevPage={this.prevPage} hits={this.state.hits} resultsPerPage={this.resultsPerPage}/>
        <Viewer selectedEmail={this.state.emails[this.state.selectedEmail]} searchString={this.state.searchString}/>
      </div>
    )
  }
}

export default App;
