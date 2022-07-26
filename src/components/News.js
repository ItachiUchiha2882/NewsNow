import React, { Component } from 'react';
import Newsitem from './Newsitem'

export class News extends Component {
  constructor() {
    super();
    this.state = {
      articles: [],
      loading: false,
      page: 1
    }
  }

  async componentDidMount() {
    let endpoint = "https://newsapi.org/v2/top-headlines?country=in&apiKey=00a8ff0ea82d49c99dbecce1be532618&pageSize=20";
    let data = await fetch(endpoint);
    let parsedData = await data.json();
    this.setState({
      articles: parsedData.articles,
      totalResults : parsedData.totalResults
    });
  }

  handlePrevClick = async () => {
    console.log("prev");
    let endpoint = `https://newsapi.org/v2/top-headlines?country=in&apiKey=00a8ff0ea82d49c99dbecce1be532618&pageSize=20&page=${this.state.page-1}`;
    let data = await fetch(endpoint);
    let parsedData = await data.json();
    this.setState({
      articles: parsedData.articles,
      page : this.state.page - 1
    })
  }

  handleNextClick = async () => {
    console.log("next");
    if(this.state.page + 1 > Math.ceil(this.state.totalResults/20)){

    }
    else{
    let endpoint = `https://newsapi.org/v2/top-headlines?country=in&apiKey=00a8ff0ea82d49c99dbecce1be532618&pageSize=20&page=${this.state.page+1}`;
    let data = await fetch(endpoint);
    let parsedData = await data.json();
    this.setState({
      articles: parsedData.articles,
      page : this.state.page + 1
    })
  }
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
            })}
          </div>
          <div className="container d-flex justify-content-between">
            <button disabled={this.state.page<=1} type="button" onClick={this.handlePrevClick} className="btn btn-secondary">&larr; Previous</button>
            <button type="button" className="btn btn-secondary">Page {this.state.page}</button>
            <button disabled={(this.state.page+1)>Math.ceil(this.state.totalResults/20)} type="button" onClick={this.handleNextClick} className="btn btn-secondary">Next &rarr;</button> 
          </div>
        </div>
      </>
    )
  }
}

export default News;