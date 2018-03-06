import React from 'react';
import DateRangePicker from './DateRangePicker';

class SearchBar extends React.Component {
  // This function should take the form input and place it in the App's state as the current set of search filters
  submitSearch(event) {
    event.preventDefault();
    const searchString = this.searchString.value;
    this.props.setSearchString(searchString);
    this.props.clearEmailSelection();
  }

  render() {
    return (
        <form className="search-bar" onSubmit={(e) => e.preventDefault()}>
          <input onChange={(e) => this.submitSearch(e)} ref={(input) => this.searchString = input} type="text" className="search" placeholder="Search me..."/>
          <label>Subject:<input type="checkbox" checked="checked"/></label>
          <label>Sender:<input type="checkbox" checked="checked"/></label>
          <label>Content:<input type="checkbox" checked="checked"/></label>
          <DateRangePicker dateFilters={this.props.dateFilters} setDateFilters={this.props.setDateFilters} setPage={this.props.setPage}/>
        </form>
    )
  }
}

export default SearchBar;