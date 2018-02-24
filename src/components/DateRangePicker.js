import React from 'react';

class DateRangePicker extends React.Component {
  constructor() {
    super()
    this.updateDateFilters = this.updateDateFilters.bind(this);
  }
  updateDateFilters(event) {
    event.preventDefault();
    const dateFilters = {
      yearFrom: this.yearFrom.value,
      yearTo: this.yearTo.value,
      monthFrom: this.monthFrom.value,
      monthTo: this.monthTo.value
    }
    this.props.setDateFilters(dateFilters);
    // Reset the page to 1 when applying new date filters. Might only want to do this when the filters have actually changed?
    this.props.setPage(1);
  }

  render() {
    // Testing greying out options in the dropdowns
    const dateFilters = this.props.dateFilters;
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
    for (let i = 1994; i <= 2017; i++){ years.push(i.toString())};
    return (
      <div>
        <label>From: 
        <select onChange={(e) => this.updateDateFilters(e)} ref={(input) => this.monthFrom = input} defaultValue="01">
          {
            Object
              .keys(months)
              .sort()
              .map(key => <option key={key} value={key}>{months[key]}</option>)
          }
        </select>
        <select onChange={(e) => this.updateDateFilters(e)}  ref={(input) => this.yearFrom = input} defaultValue="1994">
          {
            years
              .map(year => <option key={year} value={year}>{year}</option>)
          }
        </select>
        </label>
        <label>To:
        <select onChange={(e) => this.updateDateFilters(e)}  ref={(input) => this.monthTo = input} defaultValue="12">
          {
            Object
              .keys(months)
              .sort()
              .map(key => <option key={key} value={key} disabled={(dateFilters.yearTo === dateFilters.yearFrom && dateFilters.monthFrom > key) ? true : false}>{months[key]}</option>)
          }
        </select>
        <select onChange={(e) => this.updateDateFilters(e)} ref={(input) => this.yearTo = input} defaultValue="2017">
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