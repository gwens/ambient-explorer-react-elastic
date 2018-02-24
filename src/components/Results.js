import React from 'react';
import EmailPreview from './EmailPreview';

class Results extends React.Component {
  constructor() {
    super();
    this.getSearchResults = this.getSearchResults.bind(this);
    this.filterEmailsByDate = this.filterEmailsByDate.bind(this);
  }

  filterEmailsByDate() {
    const emails = this.props.emails;
    const emailIds = Object.keys(emails);
    const dateFilters = this.props.dateFilters;
    const dateFromString = dateFilters.yearFrom + "_" + dateFilters.monthFrom;
    const dateToString = dateFilters.yearTo + "_" + dateFilters.monthTo;
    const filteredEmailIds = emailIds.filter(id => (dateFromString <= id.slice(4, 11)) && (id.slice(4,11) <= dateToString));
    // Sort the emails into chronological order, oldest first
    filteredEmailIds.sort((a, b) => a > b ? 1 : -1);
    return filteredEmailIds;
  }

  getSearchResultsOld(emailIds) {
    const searchString = this.props.searchString;
    const emails = this.props.emails;
    const searchResults = emailIds.reduce((resultsArr, key) => {
      if(emails[key].subject && emails[key].subject.indexOf(searchString) > -1) {
        resultsArr.push(key);
      }
      return resultsArr;
    }, []);
    return searchResults;
  }

  getSearchResults(emailIds) {
    const emails = this.props.emails;
    const searchString = this.props.searchString.toLowerCase(); // change to case insensitive
    let resultsAll = emailIds.reduce((accumulator, id) => {
      // Using .indexOf instead of .match(regex) for performance
      const subjectMatch = emails[id].subject && (emails[id].subject.toLowerCase().indexOf(searchString) > -1) ? 3 : 0;
      const fromMatch = emails[id].from && (emails[id].from.toLowerCase().indexOf(searchString) > -1) ? 2 : 0;
      const contentMatch = emails[id].content && (emails[id].content.toLowerCase().indexOf(searchString) > -1) ? 1 : 0;
      const totalMatch = subjectMatch + fromMatch + contentMatch;
      // If there is a match
      if (totalMatch) {
        // Assign a priority number and at it to the result object as an additional property so we can sort them after
        accumulator.push({ "id" : id, "priority": totalMatch});
      }
      return accumulator;
    }, [])
    const resultsSorted = resultsAll.sort((a,b) => a.priority > b.priority ? -1 : 1);
    // Map the array of objects back to an array of the IDs only before returning it
    const resultsIds = resultsSorted.map(item => item.id);
    return resultsIds;
  }

  getPageOfResults(searchResults, maxResults, resultsPage) {
    const totalResults = searchResults.length;
    const numFullPages = Math.floor(totalResults / maxResults);
    if (totalResults <= maxResults) {
      return searchResults;
    } else if (resultsPage <= numFullPages){
      return searchResults.slice((resultsPage - 1) * maxResults, resultsPage * maxResults);
    } else {
      // return the remainder (final page)
      return searchResults.slice((resultsPage - 1) * maxResults, (resultsPage - 1) * maxResults + totalResults % maxResults);
    }
  }

  render() {
    const filteredEmailIds = this.filterEmailsByDate();
    const searchResults = this.getSearchResults(filteredEmailIds);
    const maxResults = 25;
    const resultsPage = this.props.resultsPage;
    const numFullPages = Math.floor(searchResults.length / maxResults);
    const pageOfResults = this.getPageOfResults(searchResults, maxResults, resultsPage);
    return (
      <div className="results">
        <button onClick={this.props.prevPage}>&#8249;&#8249;</button>
        <button onClick={resultsPage <= numFullPages ? this.props.nextPage : null}>&#8250;&#8250;</button>
        <ul>
          {
            pageOfResults
              .map(key => <EmailPreview key={key} index={key} details={this.props.emails[key]} selectEmail={this.props.selectEmail} searchString={this.props.searchString}/>)
          }
        </ul>
      </div>
    )
  }
}

export default Results;