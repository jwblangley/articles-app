import React, { Component } from 'react';
import './App.css';

// Load in articles JSON
import data from './articles.json'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sectionFilter: ""
    }
  }

  render() {
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
          value={this.state.sectionFilter}
          values={uniqueSections}
          onSelect={(value) => this.setState({sectionFilter:value})}
        />

        {/*
          Map data to Articles.
          First filter to match sectionFilter (or all if none selected).
          */}
        {data.results
          .filter(article => this.state.sectionFilter === ""
            || article.section === this.state.sectionFilter)
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
          value={this.props.value}
          onChange={e => this.props.onSelect(e.target.value)}
        >
        <option value="">---Select a filter---</option>
        {
          this.props.values.map(value =>
            <option value={value} key={value}>{value}</option>
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
