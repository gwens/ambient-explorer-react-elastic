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

  handleCheck(event) {
    this.props.toggleSearchFilters(event.target.value);
  }

  render() {
    const { searchFilters } = this.props;
    return (
        <form className="search-bar" onSubmit={(e) => e.preventDefault()}>
          <input onChange={(e) => this.submitSearch(e)} ref={(input) => this.searchString = input} type="text" className="search" placeholder="Search me..."/>
          <label>Subject:<input onChange={(e) => this.handleCheck(e)} type="checkbox" value="subject" checked={searchFilters.subject}/></label>
          <label>Sender:<input onChange={(e) => this.handleCheck(e)} type="checkbox" value="sender" checked={searchFilters.sender}/></label>
          <label>Content:<input onChange={(e) => this.handleCheck(e)} type="checkbox" value="content" checked={searchFilters.content}/></label>
          <DateRangePicker dateFilters={this.props.dateFilters} setDateFilters={this.props.setDateFilters} setPage={this.props.setPage}/>
          Sort by:
          <div>
          <input type="radio" id="sortByOldest" name="sortOrder" value="oldest first" />
          <label htmlFor="sortByOldest">oldest</label>
          </div>
          <div>
          <input type="radio" id="sortByNewest" name="sortOrder" value="newest first" />
          <label htmlFor="sortByNewest">newest</label>
          </div>
          <div>
          <input type="radio" id="sortByRelevance" name="sortOrder" value="relevance" />
          <label htmlFor="sortByRelevance">relevance</label>
          </div>
        </form>
    )
  }
}

export default SearchBar;