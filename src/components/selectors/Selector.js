import React, { Component } from 'react';

class Selector extends Component {
  /*
  props:
    name: the text to put in the label :: string
    currentValue: the value the Selector is currently holding
    allValues: the values of all possible items to select
    onSelect: the function to call once a selection has been made :: string -> ()
    optionClassName: function to generate a className for a select option :: string -> string
  */

  render() {
    return (
      <span className="selector">
      {this.props.name}:
      <select
        value={this.props.currentValue}
        onChange={e => this.props.onSelect(e.target.value)}
      >
      {
        [...this.props.allValues].map(value =>
          <option
            value={value}
            key={value}
            className={this.props.optionClassName(value)}
          >
          {value}
          </option>
        )
      }
      </select>
      </span>
    )
  }
}

export default Selector;
