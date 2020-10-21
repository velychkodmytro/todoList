import React, { Component } from 'react';

import './search-panel.css';

export default class SearchPanel extends Component {

  state = {
    term: ''
  }
  onSearchChange = (event) => {
    
    event.preventDefault();
    const term = event.target.value; // текущее значение input
    this.setState({ term }); // состояние обновляется, записываются новые значения
   
    this.props.onSearchChange(term);


    // this.props.searchItem(event.target.value);
  };

 




  render() {

    return (
      <input type="text"
        className="form-control search-input"
        placeholder="type to search"
        onChange={this.onSearchChange}
        value={this.state.term}
        name="label"

      />
    );
  }

};



