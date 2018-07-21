import React from "react";
import Header from "./Header";
import SearchBar from "./SearchBar";
import Results from "./Results";
import Viewer from "./Viewer";
import { buildElasticSearchQuery } from "../helpers";

class App extends React.Component {
  constructor() {
    super();
    this.fetchEmails = this.fetchEmails.bind(this);
    this.setSearchString = this.setSearchString.bind(this);
    this.toggleSearchFilters = this.toggleSearchFilters.bind(this);
    this.setDateFilters = this.setDateFilters.bind(this);
    this.setSortOrder = this.setSortOrder.bind(this);
    this.selectEmail = this.selectEmail.bind(this);
    this.clearEmailSelection = this.clearEmailSelection.bind(this);
    this.nextPage = this.nextPage.bind(this);
    this.prevPage = this.prevPage.bind(this);
    // Initial state
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
      currentPage: 1,
      loading: true,
      fetchNew: false
    };
    // Set the range of years for the app
    this.dateRange = {
      yearFrom: 1994,
      yearTo: 2017
    }
    // And the number of results per page
    this.resultsPerPage = 15;
  }

  componentDidMount() {
    this.fetchEmails()
      .then(response => { 
        console.log(response.hits);
        this.setState({ emails: response.emails, hits: response.hits, loading: false });
      });
  }

  componentDidUpdate(prevProps, prevState) {
    console.log("update called");
    if (this.state.fetchNew){
      this.fetchEmails()
        .then(response => { 
          this.setState({ emails: response.emails, hits: response.hits, loading: false, fetchNew: false });
        });
    }
  }

  fetchEmails(){
    const elasticUrl = "https://search-search-archive-sxxeh2lvo7lacugez36nv2f4bq.us-east-2.es.amazonaws.com/emails/_search";
    const searchParams = {
      searchString: this.state.searchString,
      searchFilters: this.state.searchFilters,
      dateFilters: this.state.dateFilters, 
      sortOrder: this.state.sortOrder
    }
    const query = buildElasticSearchQuery(searchParams, this.state.currentPage, this.resultsPerPage);

    return fetch(elasticUrl, {
      method: 'POST', 
      body: JSON.stringify(query), 
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    }).then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then(response => {
      let emails = {};
      response.hits.hits.map(hit => {
        let email = hit._source;
        email.score = hit._score;
        let id = hit._source.id;
        emails[`${id}`] = email;
      });
      const hits = response.hits.total;
      // Return the emails and total hits
      return { emails, hits };
    });
  }

  setSearchString(searchString){
    // If searchString is <3 chars, order oldest first by default
    if (searchString.length < 3) {
      this.setState({ searchString, sortOrder: "oldest", currentPage: 1, fetchNew: true });
    } else {
      this.setState({ searchString, sortOrder: "relevance", currentPage: 1, fetchNew: true });
    }
  }

  toggleSearchFilters(filter){
    const currentFilters = this.state.searchFilters;
    // Flip the value of the filter that was clicked
    currentFilters[filter] = !currentFilters[filter];
    this.setState( { searchFilters: currentFilters }, () => {
      // Only fetch a new set of emails and revert to page 1 if there is a search term
      if (this.state.searchString.length >= 3) {
        this.setState( { currentPage: 1, loading: true, fetchNew: true });
      }
    });
  }

  setDateFilters(dateFilters){
    this.setState({ dateFilters, currentPage: 1, loading: true, fetchNew: true });
  }

  setSortOrder(option){
    this.setState({ sortOrder: option, currentPage: 1, loading: true, fetchNew: true });
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
    this.setState( { currentPage, loading: true, fetchNew: true });
  }

  prevPage(){
    let currentPage = this.state.currentPage;
    currentPage--;
    this.setState( { currentPage, loading: true, fetchNew: true });
  }

  render() {
    return (
      <div className="navigator">
        <Header />
        <SearchBar setSearchString={this.setSearchString} dateFilters={this.state.dateFilters} setDateFilters={this.setDateFilters} dateRange = {this.dateRange} toggleSearchFilters={this.toggleSearchFilters} searchFilters={this.state.searchFilters} sortOrder={this.state.sortOrder} setSortOrder={this.setSortOrder} clearEmailSelection={this.clearEmailSelection} searchString={this.state.searchString}/>
        <div className="main-container">
          <Results emails={this.state.emails} selectEmail={this.selectEmail} selectedEmail={this.state.selectedEmail} currentPage={this.state.currentPage} nextPage={this.nextPage} prevPage={this.prevPage} hits={this.state.hits} resultsPerPage={this.resultsPerPage} loading={this.state.loading} />
          <Viewer selectedEmail={this.state.emails[this.state.selectedEmail]} clearEmailSelection={this.clearEmailSelection} searchString={this.state.searchString}/>
        </div>
      </div>
    )
  }
}

export default App;
