import React, { Component } from 'react';
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
      <div className="article">
        <a href={this.props.article.url} target="_blank"><h1>{this.props.article.title}</h1></a>
        <div className="articleInfoOuter">
          <span className="articleInfo">
            <h2>{this.props.article.section}</h2>
            <h3>Views: {this.props.article.views}</h3>
          </span>
        </div>
        <div className="thumbnail">
          <img src={this.props.article.thumbnail_url} />
        </div>
        <div className="description">
          <p>{this.props.article.description}</p>
        </div>
      </div>
    )
  }
}

export default Article;
