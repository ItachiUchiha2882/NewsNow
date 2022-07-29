import React, { Component } from 'react';
import Newsitem from './Newsitem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'

export class News extends Component {
  static defaultProps = {
    pageSize: 9,
    country: 'in',
    category: 'general'
  }

  static propTypes = {
    pageSize: PropTypes.number,
    country: PropTypes.string,
    category: PropTypes.string
  }

  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: false,
      page: 1
    }
    document.title = `NewsNow - ${this.capitalizeFirstLetter(this.props.category)}`;
  }

  updateNews = async () => {
    let endpoint = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=00a8ff0ea82d49c99dbecce1be532618&pageSize=${this.props.pageSize}&page=${this.state.page}`;
    this.setState({ loading: true });
    let data = await fetch(endpoint);
    let parsedData = await data.json();
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false
    });
  }

  async componentDidMount() {
    // await this.setState({page: 1});
    this.updateNews();
  }

  handlePrevClick = async () => {
    await this.setState({page: this.state.page - 1});
    this.updateNews();
  }

  handleNextClick = async () => {
    await this.setState({page: this.state.page + 1});
    this.updateNews();
  }

  render() {
    return (
      <>
        <div className='container my-3'>
          <h2 style={{margin : '30px 0px'}}>NewsNow - Top {this.capitalizeFirstLetter(this.props.category)} headlines</h2>
          {this.state.loading && <Spinner />}
          <div className='row'>
            {/* this ensures that content is gone, when loading. */}
            {!this.state.loading && this.state.articles.map((element) => {
              return <div className="col-md-4 my-3" key={element.url}>
                <Newsitem title={element.title} description={element.description} imgUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
              </div>
            })}
          </div>
          <div className="container d-flex justify-content-between">
            <button disabled={this.state.page <= 1} type="button" onClick={this.handlePrevClick} className="btn btn-secondary">&larr; Previous</button>
            <button type="button" className="btn btn-secondary">Page {this.state.page}</button>
            <button disabled={(this.state.page + 1) > Math.ceil(this.state.totalResults / this.props.pageSize)} type="button" onClick={this.handleNextClick} className="btn btn-secondary">Next &rarr;</button>
          </div>
        </div>
      </>
    )
  }
}

export default News;