import React from 'react';

const Viewer = (props) => {
    const { selectedEmail, clearEmailSelection, searchString } = props;
    if(selectedEmail) {
      const regex = new RegExp(searchString, 'gi');
      const contentHl = searchString ? selectedEmail.content.replace(regex, `<span class="hl">${searchString}</span>`) : selectedEmail.content ;
      return (
        <div className="viewer">
          <button className="back-button" onClick={ clearEmailSelection }>&#8249;&#8249; back to search results... </button>
          <div className="viewer-header">
            <div className="viewer-line">Date: {selectedEmail.dateString} </div>
            <div className="viewer-line">From: {selectedEmail.from}</div>
            <div className="viewer-line">Subject: {selectedEmail.subject}</div>
          </div>
          <div className="viewer-body" dangerouslySetInnerHTML={{ __html: contentHl }} />
        </div>
      )
    }
    else {
      return null;
    }
  }

export default Viewer;