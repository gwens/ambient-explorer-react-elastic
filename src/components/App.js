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
    this.toggleSearchFilters = this.toggleSearchFilters.bind(this);
    this.setDateFilters = this.setDateFilters.bind(this);
    this.setSortOrder = this.setSortOrder.bind(this);
    this.selectEmail = this.selectEmail.bind(this);
    this.clearEmailSelection = this.clearEmailSelection.bind(this);
    this.nextPage = this.nextPage.bind(this);
    this.prevPage = this.prevPage.bind(this);
    // Get initial state
    this.state = {
      hits: 0,
      emails: {},
      searchString: "",
      searchFilters: {
        subject: true,
        sender: true,
        content: true
      },
      dateFilters: {
        yearFrom: "1994",
        yearTo: "2017",
        monthFrom: "01",
        monthTo: "12"
      },
      sortOrder: "oldest",
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
    const elasticUrl = "https://search-search-archive-sxxeh2lvo7lacugez36nv2f4bq.us-east-2.es.amazonaws.com/emails/_search"
    // Default query for no search term, returns all documents

    // Partial query for matching all if no search term
    const matchAll = [{"match_all" : {}}];

    const matchSubject = { "match": { "subject": {"query": `${searchString}`, "boost": 2} } };
    // NB sender is called 'from' in dataset
    const matchSender = { "match": { "from": { "query": `${searchString}`, "boost": 1.5 } } };
    const matchContent = { "match": { "content": `${searchString}` } };
    const matchVarious = [];
    if (this.state.searchFilters.subject) { matchVarious.push(matchSubject); };
    if (this.state.searchFilters.sender) { matchVarious.push(matchSender); };
    if (this.state.searchFilters.content) { matchVarious.push(matchContent); };
    // Full query for matching a string if a search term exists
    const matchString = [
      { "bool": {
        "should": matchVarious
      }}];
    // Start checking for matches once the string is at least 3 characters long
    const matchQuery = searchString.length > 2 ? matchString : matchAll;

    // Pagination
    const from = (this.state.currentPage - 1) * this.resultsPerPage;

    // Sort order
    let sort;
    if (this.state.sortOrder == "oldest") { sort = {"id.raw": {"order": "asc"}} };
    if (this.state.sortOrder == "newest") { sort = {"id.raw": {"order": "desc"}} };
    // Sort by score, but if two emails have the same score, show the oldest first
    if (this.state.sortOrder == "relevance") { sort = [ 
      {"_score": {"order": "desc"}},
      {"id.raw": {"order": "asc"}} 
    ]};

    // Combined elasticsearch query with date filters, sorting and pagination
    const query = {
      "from": from,
      "size": this.resultsPerPage,
      "sort": sort,
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
    // If searchString is <3 chars, order oldest first by default
    if (searchString.length < 3) {
      this.setState({ searchString, sortOrder: "oldest", currentPage: 1 }, () => { 
        this.fetchEmailsFromEs() 
      })
    } else {
      this.setState({ searchString, sortOrder: "relevance", currentPage: 1 }, () => { 
        this.fetchEmailsFromEs() 
      })
    }
  }

  toggleSearchFilters(filter){
    const currentFilters = this.state.searchFilters;
    currentFilters[filter] = !currentFilters[filter];
    this.setState( { searchFilters: currentFilters }, () => { this.fetchEmailsFromEs() });
  }

  setDateFilters(filters){
    // Create a copy of the current state first... 
    // Spread operator not working in new build config, need to figure out Babel?
    //const dateFilters = {...filters};
    //this.setState({ dateFilters });
    // Replacing spread with Object.assign (works as object is only one level deep)
    const dateFilters = Object.assign({}, filters);
    // Fetch emails as callback only once date filters are set
    this.setState({ dateFilters, currentPage: 1 }, () => { this.fetchEmailsFromEs() });
  }

  setSortOrder(option){
    this.setState({ sortOrder: option }, () => { this.fetchEmailsFromEs() });
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

  render() {
    return (
      <div className="navigator">
        <Header />
        <SearchBar setSearchString={this.setSearchString} dateFilters={this.state.dateFilters} setDateFilters={this.setDateFilters} toggleSearchFilters={this.toggleSearchFilters} searchFilters={this.state.searchFilters} sortOrder={this.state.sortOrder} setSortOrder={this.setSortOrder} clearEmailSelection={this.clearEmailSelection} />
        <div className="main-container">
          <Results emails={this.state.emails} selectEmail={this.selectEmail} selectedEmail={this.state.selectedEmail} currentPage={this.state.currentPage} nextPage={this.nextPage} prevPage={this.prevPage} hits={this.state.hits} resultsPerPage={this.resultsPerPage}/>
          <Viewer selectedEmail={this.state.emails[this.state.selectedEmail]} searchString={this.state.searchString}/>
        </div>
      </div>
    )
  }
}

export default App;
