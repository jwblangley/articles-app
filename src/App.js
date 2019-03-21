import React, { Component } from 'react';
import './App.css';

// Load in articles JSON
import data from './articles.json'

class App extends Component {
  // Map article data to components.
  render() {
    // const articles =
    return (
      data.results.map(article => <Article article={article} key={article.url}/>)
    );
  }
}

class Article extends Component {
  render() {
    return (
      <div>
        <h1>{this.props.article.title}</h1>
        <hr/>
      </div>
    );
  }
}

export default App;
