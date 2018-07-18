import React from "react";
import DateRangePicker from "./DateRangePicker";

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.searchRef = React.createRef();
    this.submitSearch = this.submitSearch.bind(this);
  }

  // Take the form input and place it in the App's state as the current set of search filters
  submitSearch(event) {
    event.preventDefault();
    const searchString = this.searchRef.current.value;
    this.props.setSearchString(searchString);
    this.props.clearEmailSelection();
  }

  render() {
    const { searchFilters, sortOrder, toggleSearchFilters, setSortOrder, dateFilters, setDateFilters, dateRange } = this.props;
    return (
        <form className="search-bar" onSubmit={(e) => e.preventDefault()}>
          <input className="search" onChange={(e) => this.submitSearch(e)} ref={this.searchRef} type="text" placeholder="Search..."/>
          <div className="search-elem">
            <label>subject<input onChange={(e) => toggleSearchFilters(e.target.value)} type="checkbox" value="subject" checked={searchFilters.subject}/></label>
            <label>sender<input onChange={(e) => toggleSearchFilters(e.target.value)} type="checkbox" value="sender" checked={searchFilters.sender}/></label>
            <label>content<input onChange={(e) => toggleSearchFilters(e.target.value)} type="checkbox" value="content" checked={searchFilters.content}/></label>
          </div>
          <DateRangePicker dateFilters={dateFilters} setDateFilters={setDateFilters} dateRange={dateRange} />
          <div className="search-elem">Sort by:
            
            <input onChange={(e) => setSortOrder(e.target.value)} type="radio" id="sortByOldest" name="sortOrder" value="oldest" checked={sortOrder == "oldest" ? true : false} />
            <label htmlFor="sortByOldest">oldest</label>
            
            <input onChange={(e) => setSortOrder(e.target.value)} type="radio" id="sortByNewest" name="sortOrder" value="newest" checked={sortOrder == "newest" ? true : false} />
            <label htmlFor="sortByNewest">newest</label>
            
            <input onChange={(e) => setSortOrder(e.target.value)} type="radio" id="sortByRelevance" name="sortOrder" value="relevance" checked={sortOrder == "relevance" ? true : false} disabled={this.props.searchString.length < 3 ? true : false} />
            <label htmlFor="sortByRelevance">relevance</label>
            
          </div>
        </form>
    )
  }
}

export default SearchBar;