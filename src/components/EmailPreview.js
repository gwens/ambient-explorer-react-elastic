import React from 'react';

class EmailPreview extends React.Component {
  render() {
    const { details, index } = this.props;
  return (
      <li onClick={() => this.props.selectEmail(index)}>
        <div className="sender">{details.from}</div>
        <div className="subject">{details.subject}}</div>
      </li>
    )
  }
}

export default EmailPreview;