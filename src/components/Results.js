import React from 'react';
import EmailPreview from './EmailPreview';

class Results extends React.Component {
  render() {
    // Search results are handled as an array of ids
    const results = Object.keys(this.props.emails);
    
    const maxResults = 25; // duplication
    const currentPage = this.props.currentPage;
    const numPages = Math.ceil(this.props.hits / maxResults);
    return (
      <div className="results">
        <button onClick={this.props.prevPage} disabled={currentPage === 1}>&#8249;&#8249;</button>
        <span>page: {currentPage}</span>
        <button onClick={currentPage < numPages ? this.props.nextPage : null} disabled={currentPage === numPages}>&#8250;&#8250;</button>
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