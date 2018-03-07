import React from 'react';
import DateRangePicker from './DateRangePicker';

class SearchBar extends React.Component {
  constructor() {
    super()
    this.submitSearch = this.submitSearch.bind(this);
    this.handleCheck = this.handleCheck.bind(this);
    this.updateSelection = this.updateSelection.bind(this);
  }
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

  updateSelection(event) {
    this.props.setSortOrder(event.target.value);
  }

  render() {
    const { searchFilters, sortOrder } = this.props;
    return (
        <form className="search-bar" onSubmit={(e) => e.preventDefault()}>
          <input className="search-elem" onChange={(e) => this.submitSearch(e)} ref={(input) => this.searchString = input} type="text" className="search" placeholder="Search..."/>
          <div className="search-elem" >
            <label><input onChange={(e) => this.handleCheck(e)} type="checkbox" value="subject" checked={searchFilters.subject}/>subject</label>
            <label><input onChange={(e) => this.handleCheck(e)} type="checkbox" value="sender" checked={searchFilters.sender}/>sender</label>
            <label><input onChange={(e) => this.handleCheck(e)} type="checkbox" value="content" checked={searchFilters.content}/>content</label>
          </div>
          <DateRangePicker dateFilters={this.props.dateFilters} setDateFilters={this.props.setDateFilters} />
          <div className="search-elem">Sort by:
            
            <input onChange={(e) => this.updateSelection(e)} type="radio" id="sortByOldest" name="sortOrder" value="oldest" checked={sortOrder == "oldest" ? true : false} />
            <label htmlFor="sortByOldest">oldest</label>
            
            <input onChange={(e) => this.updateSelection(e)} type="radio" id="sortByNewest" name="sortOrder" value="newest" checked={sortOrder == "newest" ? true : false} />
            <label htmlFor="sortByNewest">newest</label>
            
            <input onChange={(e) => this.updateSelection(e)} type="radio" id="sortByRelevance" name="sortOrder" value="relevance" checked={sortOrder == "relevance" ? true : false} />
            <label htmlFor="sortByRelevance">relevance</label>
            
          </div>
        </form>
    )
  }
}

export default SearchBar;