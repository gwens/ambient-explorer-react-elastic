import React from 'react';

const EmailPreview = (props) => {
  const { details, index, selectEmail, selectedEmail } = props;
  return (
    <li onClick={() => selectEmail(index)} className={selectedEmail==index? "selected" : "unselected"}>
      <div className="sender">{details.from}</div>
      <div className="subject">{details.subject}</div>
    </li>
  )
}


export default EmailPreview;
