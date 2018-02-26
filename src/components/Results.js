import React from 'react';
import EmailPreview from './EmailPreview';

class Results extends React.Component {
  constructor() {
    super();
    this.getPageOfResults = this.getPageOfResults.bind(this);
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
    // Search results are handled as an array of ids
    const searchResults = Object.keys(this.props.emails);
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
              .map(key => <EmailPreview key={key} index={key} details={this.props.emails[key]} selectEmail={this.props.selectEmail} />)
          }
        </ul>
      </div>
    )
  }
}

export default Results;