import React from "react";

class DateRangePicker extends React.Component {
  constructor(props) {
    super(props)
    this.monthFromRef = React.createRef();
    this.yearFromRef = React.createRef();
    this.monthToRef = React.createRef();
    this.yearToRef = React.createRef();
    this.updateDateFilters = this.updateDateFilters.bind(this);
  }
  updateDateFilters(event) {
    event.preventDefault();
    const dateFilters = {
      yearFrom: this.yearFromRef.current.value,
      yearTo: this.yearToRef.current.value,
      monthFrom: this.monthFromRef.current.value,
      monthTo: this.monthToRef.current.value
    }
    this.props.setDateFilters(dateFilters);
  }

  render() {
    // Testing greying out options in the dropdowns
    const { dateFilters, dateRange } = this.props;
    const months = {
      "01": "JAN", 
      "02": "FEB", 
      "03": "MAR", 
      "04": "APR", 
      "05": "MAY", 
      "06": "JUN", 
      "07": "JUL", 
      "08": "AUG", 
      "09": "SEP", 
      "10": "OCT", 
      "11": "NOV", 
      "12": "DEC"
    };
    // Build years array as an array of strings
    const years = [];
    for (let i = dateRange.yearFrom; i <= dateRange.yearTo; i++){ years.push(i.toString())};
    return (
      <div className="search-elem">
        <label>From:
        <select onChange={(e) => this.updateDateFilters(e)} ref={this.monthFromRef} defaultValue="01">
          {
            Object
              .keys(months)
              .sort()
              .map(key => <option key={key} value={key}>{months[key]}</option>)
          }
        </select>
        <select onChange={(e) => this.updateDateFilters(e)}  ref={this.yearFromRef} defaultValue={dateRange.yearFrom.toString()}>
          {
            years
              .map(year => <option key={year} value={year}>{year}</option>)
          }
        </select>
        </label>
        <label>To:
        <select onChange={(e) => this.updateDateFilters(e)}  ref={this.monthToRef} defaultValue="12">
          {
            Object
              .keys(months)
              .sort()
              .map(key => <option key={key} value={key} disabled={(dateFilters.yearTo === dateFilters.yearFrom && dateFilters.monthFrom > key) ? true : false}>{months[key]}</option>)
          }
        </select>
        <select onChange={(e) => this.updateDateFilters(e)} ref={this.yearToRef} defaultValue={dateRange.yearTo.toString()}>
          {
            years
              .map(year => <option key={year} value={year} disabled={dateFilters.yearFrom <= year ? false : true}>{year}</option>)
          }
        </select>
        </label>
      </div>
    )
  }
}

export default DateRangePicker;