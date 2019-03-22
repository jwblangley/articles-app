import React, { Component } from 'react';
import Selector from './Selector.js'

class MultiSelector extends Component {
  /*
    props:
      name: the text to put in the label :: string
      currentValues: the values the Selector is currently holding :: Set
      allValues: the values of all possible items to select :: Set(string)
      onSelect: the function to call once a selection has been made :: string -> ()
  */

  optionClassName(value) {
    return this.props.currentValues.has(value)?"bold":"";
  }

  render() {
    var boundOptionClassName = this.optionClassName.bind(this);

    return (
      <Selector
        name={this.props.name}
        currentValue={this.props.currentValue}
        allValues={this.props.allValues}
        onSelect={this.props.onSelect}
        optionClassName={boundOptionClassName}
      />
    )
  }
}

export default MultiSelector;
