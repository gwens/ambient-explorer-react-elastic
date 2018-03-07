import React from 'react';
import EmailPreview from './EmailPreview';

class Results extends React.Component {
  render() {
    // Search results are handled as an array of ids
    const results = Object.keys(this.props.emails);
    const currentPage = this.props.currentPage;
    const numPages = Math.ceil(this.props.hits / this.props.resultsPerPage);
    return (
      <div className={this.props.selectedEmail ? "results active" : "results"}>
        <div className="results-controls">
          <button onClick={this.props.prevPage} disabled={currentPage === 1}>&#8249;&#8249;</button>
          <span>page: {currentPage}</span>
          <button onClick={currentPage < numPages ? this.props.nextPage : null} disabled={currentPage === numPages}>&#8250;&#8250;</button>
        </div>
        <ul>
          {
            results
              .map(key => <EmailPreview key={key} index={key} details={this.props.emails[key]} selectEmail={this.props.selectEmail} selectedEmail={this.props.selectedEmail} />)
          }
        </ul>
      </div>
    )
  }
}

export default Results;