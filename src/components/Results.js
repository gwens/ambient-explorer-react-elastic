import React from "react";
import EmailPreview from "./EmailPreview";

const Results = (props) => {
  const { emails, selectEmail, selectedEmail, currentPage, pageUp, pageDown, hits, resultsPerPage, loading } = props;
  // Search results are handled as an array of ids
  const results = Object.keys(emails);
  // Calculate number of pages
  const numPages = Math.ceil(hits/resultsPerPage);
  return (
    <div className={selectedEmail ? "results active" : "results"}>
      <div className="results-controls">
        <button onClick={pageDown} disabled={currentPage === 1}>&#8249;&#8249;</button>
        <span>page: {currentPage}/{numPages}</span>
        <button onClick={currentPage < numPages ? pageUp : null} disabled={currentPage === numPages}>&#8250;&#8250;</button>
      </div>
      <div className={loading ? "loader" : "loader disabled"}></div>
      <ul>
        {
          results
            .map(key => <EmailPreview key={key} index={key} details={emails[key]} selectEmail={selectEmail} selectedEmail={selectedEmail} />)
        }
      </ul>
    </div>
  )
}

export default Results;
