import React from 'react';
import EmailPreview from './EmailPreview';

class Results extends React.Component {
  render() {
    // Search results are handled as an array of ids
    const results = Object.keys(this.props.emails);
    
    const maxResults = 25; // duplication
    const resultsPage = this.props.resultsPage;
    const numPages = Math.ceil(this.props.hits / maxResults);
    return (
      <div className="results">
        <button onClick={this.props.prevPage} disabled={resultsPage === 1}>&#8249;&#8249;</button>
        <span>page: {resultsPage}</span>
        <button onClick={resultsPage < numPages ? this.props.nextPage : null} disabled={resultsPage === numPages}>&#8250;&#8250;</button>
        <ul>
          {
            results
              .map(key => <EmailPreview key={key} index={key} details={this.props.emails[key]} selectEmail={this.props.selectEmail} />)
          }
        </ul>
      </div>
    )
  }
}

export default Results;