import React, { Component } from 'react';
import './App.css';

// Load in articles JSON
import data from './articles.json'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sectionFilter: new Set()
    }
  }

  render() {
    console.log(this.state.sectionFilter);
    /*
    Convert the sections to a set to remove duplicates and back to an array for usage
    N.B calling this every render does not affect performance due to React data diff.
    */
    const uniqueSections = [...new Set(data.results.map(article => article.section))];

    return (
      // sectionFilter is part of the state of App
      <div>
        <Selector
          name={"Section"}
          currentValues={this.state.sectionFilter}
          allValues={uniqueSections}
          onSelect={(value) => {
            if (this.state.sectionFilter.has(value)) {
              // Create a new copy of sectionFilter to update state.
              var newSectionFilter = new Set([...this.state.sectionFilter]);
              newSectionFilter.delete(value);
              this.setState({sectionFilter:newSectionFilter})
            } else {
              this.setState({sectionFilter:new Set([value, ...this.state.sectionFilter])})
            }
          }}
        />

        {/*
          Map data to Articles.
          First filter to match sectionFilter (or all if none selected).
          */}
        {data.results
          .filter(article => this.state.sectionFilter.has(article.section))
          .map(article => <Article article={article} key={article.url} />)}
      </div>
    );
  }
}

class Selector extends Component {
  render() {
    return (
      <span>
        {this.props.name}:
        <select id='section-select'
          value={this.props.currentValues}
          onChange={e => this.props.onSelect(e.target.value)}
        >
        <option value="">---Select a filter---</option>
        {
          this.props.allValues.map(value =>
            <option
              value={value} 
              key={value}
              className={this.props.currentValues.has(value)?"bold":""}
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

class Article extends Component {
  render() {
    return (
      <div>
        <a href={this.props.article.url} target="_blank"><h1>{this.props.article.title}</h1></a>
        <h3>{this.props.article.section}</h3>
        <img src={this.props.article.thumbnail_url} />
        <hr/>
      </div>
    )
  }
}

export default App;
