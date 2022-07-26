import React, { Component } from 'react';
import Newsitem from './Newsitem'

export class News extends Component {
  constructor() {
    super();
    this.state = {
      articles: [],
      loading: false
    }
  }

  async componentDidMount() {
    const endpoint = "https://newsapi.org/v2/top-headlines?country=in&apiKey=00a8ff0ea82d49c99dbecce1be532618";
    let data = await fetch(endpoint);
    let parsedData = await data.json();
    this.setState({
      articles: parsedData.articles
    });

  }
  render() {
    return (
      <>
        <div className='container my-3'>
          <h2>Top headlines</h2>
          <div className='row'>
            {this.state.articles.map((element) => {
              return <div className="col-md-4 my-3" key={element.url}>
                <Newsitem title={element.title} description={element.description} imgUrl={element.urlToImage} newsUrl={element.url} />
              </div>
            })};
          </div>
        </div>
      </>
    )
  }
}

export default News;