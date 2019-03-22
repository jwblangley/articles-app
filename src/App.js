import React, { Component } from 'react';
import './App.css';

// Load in articles JSON
import data from './articles.json'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sectionFilter: new Set(["All"])
    }
  }

  render() {
    /*
    Convert the sections to a set to remove duplicates and back to an array for usage
    N.B calling this every render does not affect performance due to React data diff.
    */
    const uniqueSections = new Set(data.results.map(article => article.section));

    return (
      // sectionFilter is part of the state of App
      <div>
        <span>
          <Selector
            name="Section"
            currentValues={this.state.sectionFilter}
            allValues={new Set(["All", ...uniqueSections])}
            onSelect={value => {
              if (this.state.sectionFilter.has(value)) {
                if (value === "All") {
                  // When deselecting "All" clear all selections.
                  this.setState({sectionFilter:new Set()});
                } else {
                  // Create a new copy of sectionFilter to update state.
                  var newSectionFilter = new Set([...this.state.sectionFilter]);
                  newSectionFilter.delete(value);
                  this.setState({sectionFilter:newSectionFilter})
                }
              } else {
                if (value === "All") {
                  // When deselecting "All" clear all selections.
                  this.setState({sectionFilter:new Set(["All"])});
                } else {
                  // When selecting any other item, deselect "All".
                  var newSectionFilter = new Set([value, ...this.state.sectionFilter]);
                  // N.B this returns false if "All" is not selected, but does not crash.
                  newSectionFilter.delete("All");
                  this.setState({sectionFilter:newSectionFilter})
                }
              }
            }}
          />

          <Selector
            name="Sort by"
            currentValues={new Set()}
            allValues={new Set(["Hello"])}
            onSelect={value => {
              console.log(value)
            }}
          />
        </span>

        {/*
          Map data to Articles.
          First filter to match sectionFilter (or all if none selected).
          */}
        {data.results
          .filter(article => this.state.sectionFilter.has("All")
            || this.state.sectionFilter.has(article.section))
          .map(article => <Article article={article} key={article.url} />)}
      </div>
    );
  }
}

class Selector extends Component {
  /*
    props:
      name: the text to put in the label :: string
      currentValues: the values the Selector is currently holding :: Set
      allValues: the values of all possible items to select :: Set
      onSelect: the function to call once a selection has been made :: string -> ()
  */
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
          [...this.props.allValues].map(value =>
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
  /*
    props:
      article: the article data to be rendered :: {
        title :: string
        description :: string
        thumbnail_url :: string
        url :: string
        section :: string
        views :: int
      }
  */
  render() {
    return (
      <div>
        <a href={this.props.article.url} target="_blank"><h1>{this.props.article.title}</h1></a>
        <h3>{this.props.article.section}</h3>
        <img src={this.props.article.thumbnail_url} />
        <p>{this.props.article.description}</p>
        <hr/>
      </div>
    )
  }
}

export default App;
