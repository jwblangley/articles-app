import React, { Component } from 'react';
import BasicSelector from './components/selectors/BasicSelector.js';
import MultiSelector from './components/selectors/MultiSelector.js';
import Article from './components/Article.js';
import './App.css';

// Load in articles JSON.
import data from './articles.json'

// Load in article comparisons.
import {noComparison, viewsComparison, titleComparison} from './comparisons.js'
// Create sortMap from string to function for efficient lookup.
const sortMap = new Map([
  ["None", noComparison],
  ["Views: Increasing", viewsComparison],
  ["Views: Decreasing", (a, b) => -1 * viewsComparison(a, b)],
  ["Title: Increasing", titleComparison],
  ["Title: Decreasing", (a, b) => -1 * titleComparison(a, b)]
]);


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      sectionFilter: new Set(["All"]),
      sort: "None"
    }
  }

  render() {
    /*
    Convert the sections to a set to remove duplicates and back to an array for usage
    N.B calling this every render does not affect performance due to React data diff.
    */
    const uniqueSections = new Set(data.results.map(article => article.section));

    return (
      // sectionFilter and sort are part of the state of App
      <div>
        <div className = "navbar">
          <MultiSelector
            name="Section"
            currentValues={this.state.sectionFilter}
            allValues={new Set(["All", ...uniqueSections])}
            onSelect={value => {
              if (this.state.sectionFilter.has(value)) {
                // N.B It is not possible to deselect all as this is run on change.
                // Create a new copy of sectionFilter to update state.
                var newSectionFilter = new Set([...this.state.sectionFilter]);
                newSectionFilter.delete(value);
                this.setState({sectionFilter:newSectionFilter})
              } else {
                if (value.valueOf() === new String("All").valueOf()) {
                  // When selecting "All" clear all other selections.
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

          <BasicSelector
            name="Sort by"
            currentValue={this.state.sort}
            allValues={new Set([...sortMap.keys()])}
            onSelect={value => {
              this.setState({sort:value})
            }}
          />
        </div>

        {/*
          Map data to Articles.
          First filter to match sectionFilter (or all if "All" selected),
          then sort by the currently chosen sort function.
        */}
        <div className="content">
        {data.results
          .filter(article => this.state.sectionFilter.has("All")
            || this.state.sectionFilter.has(article.section))
          .sort(sortMap.get(this.state.sort))
          .map(article => <Article article={article} key={article.url} />)}
        </div>
      </div>
    );
  }
}

export default App;
