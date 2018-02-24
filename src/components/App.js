import React from 'react';
import Header from './Header';
import SearchBar from './SearchBar';
import Results from './Results';
import Viewer from './Viewer';
//import emails from '../sample-emails';

class App extends React.Component {
  constructor() {
    super();
    this.fetchEmails = this.fetchEmails.bind(this);
    this.setSearchString = this.setSearchString.bind(this);
    this.setDateFilters = this.setDateFilters.bind(this);
    this.selectEmail = this.selectEmail.bind(this);
    this.clearEmailSelection = this.clearEmailSelection.bind(this);
    this.nextPage = this.nextPage.bind(this);
    this.prevPage = this.prevPage.bind(this);
    this.setPage = this.setPage.bind(this);
    // Get initial state
    // Not sure if should use numbers or strings for dates (especially months, as 01, 02, etc)
    this.state = {
      emails: {},
      searchString: "",
      dateFilters: {
        yearFrom: "1994",
        yearTo: "2017",
        monthFrom: "01",
        monthTo: "12"
      },
      selectedEmail: null, // Holds the email to be displayed in the viewer
      resultsPage: 1
    };
    // Get the emails from the remote URL
    this.fetchEmails();
  }

  // Gets emails from a remote URL and sets them in state
  fetchEmails() {
    fetch('https://api.myjson.com/bins/7crgt', {
      mode: 'cors'
    })
      .then(response => response.json())
      .catch(error => console.log(error))
      .then(response => {
        // NB only one level deep copy!
        const emails = Object.assign(response);
        this.setState({ emails });
      });
  }

  setSearchString(searchString){
    this.setState({ searchString });
  }

  setDateFilters(filters){
    // Create a copy of the current state first... 
    // Spread operator not working in new build config, need to figure out Babel?
    //const dateFilters = {...filters};
    //this.setState({ dateFilters });
    // Replacing spread with Object.assign (works as object is only one level deep)
    const dateFilters = Object.assign({}, filters);
    this.setState({ dateFilters });
  }

  selectEmail(id){
    //let selectedEmail = {};
    //selectedEmail[id] = emails[id];
    this.setState({ selectedEmail: id });
  }

  clearEmailSelection(){
    this.setState({ selectedEmail: null });
  }

  nextPage(){
    let resultsPage = this.state.resultsPage;
    resultsPage++; // Need to figure out if you're on the last page or not, but do this in Results
    this.setState( { resultsPage });
  }

  prevPage(){
    let resultsPage = this.state.resultsPage;
    resultsPage = resultsPage === 1 ? 1 : resultsPage - 1 // Try putting this logic here for now, but might want them both in the same place
    this.setState( { resultsPage });
  }

  setPage(x) {
    let resultsPage = this.state.resultsPage;
    resultsPage = x;
    this.setState( { resultsPage });
  }

  render() {
    return (
      <div className="navigator">
        <Header />
        <SearchBar setSearchString={this.setSearchString} dateFilters={this.state.dateFilters} setDateFilters={this.setDateFilters} clearEmailSelection={this.clearEmailSelection} setPage={this.setPage}/>
        <Results emails={this.state.emails} dateFilters={this.state.dateFilters} searchString={this.state.searchString} selectEmail={this.selectEmail} resultsPage={this.state.resultsPage} nextPage={this.nextPage} prevPage={this.prevPage}/>
        <Viewer selectedEmail={this.state.emails[this.state.selectedEmail]} searchString={this.state.searchString}/>
      </div>
    )
  }
}

export default App;
