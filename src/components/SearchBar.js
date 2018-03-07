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
          Sort by:
          <div>
          <input type="radio" id="sortByOldest" name="sortOrder" value="oldest first" />
          <label for="sortByOldest">oldest</label>
          </div>
          <div>
          <input type="radio" id="sortByNewest" name="sortOrder" value="newest first" />
          <label for="sortByNewest">newest</label>
          </div>
          <div>
          <input type="radio" id="sortByRelevance" name="sortOrder" value="relevance" />
          <label for="sortByRelevance">relevance</label>
          </div>
        </form>
    )
  }
}

export default SearchBar;