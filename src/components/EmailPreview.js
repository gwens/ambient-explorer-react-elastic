import React from 'react';

class EmailPreview extends React.Component {
  render() {
    const { details, index, searchString } = this.props;
    const regex = new RegExp(searchString, 'gi');
    const fromHl = searchString ? details.from.replace(regex, `<span class="hl">${searchString}</span>`) : details.from ;
    const subjectHl = searchString ? details.subject.replace(regex, `<span class="hl">${searchString}</span>`) : details.subject ;
    return (
      <li onClick={() => this.props.selectEmail(index)}>
        <div className="sender" dangerouslySetInnerHTML={{ __html: fromHl }} />
        <div className="subject" dangerouslySetInnerHTML={{ __html: subjectHl }} />
      </li>
    )
  }
}

export default EmailPreview;