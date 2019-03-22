import React, { Component } from 'react';
import Selector from './Selector.js'

class BasicSelector extends Component {
  /*
    props:
      name: the text to put in the label :: string
      currentValue: the value the Selector is currently holding :: string
      allValues: the values of all possible items to select :: Set(string);
      onSelect: the function to call once a selection has been made :: string -> ()
  */
  render() {
    return (
      <Selector
        name={this.props.name}
        currentValue={this.props.currentValue}
        allValues={this.props.allValues}
        onSelect={this.props.onSelect}
        optionClassName={(value)=>{return ""}}
      />
    )
  }
}

export default BasicSelector;
