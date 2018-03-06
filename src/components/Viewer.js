import React from 'react';

class Viewer extends React.Component {
  render() {
    const { selectedEmail } = this.props;
    if(this.props.selectedEmail) {
      const searchString = this.props.searchString;
      const regex = new RegExp(searchString, 'gi');
      const contentHl = searchString ? selectedEmail.content.replace(regex, `<span class="hl">${searchString}</span>`) : selectedEmail.content ;
      return (
        <div className="viewer">
          <div className="viewer-header">
            <div>Date: {selectedEmail.dateString}</div>
            <div>From: {selectedEmail.from}</div>
            <div>Subject: {selectedEmail.subject}</div>
          </div>
          <div dangerouslySetInnerHTML={{ __html: contentHl }} />
        </div>
      )
    }
    else {
      return null;
    }
  }
}

export default Viewer;