import React, { Component } from 'react';
import Newsitem from './Newsitem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';

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
      page: 1,
    }
    document.title = `NewsNow - ${this.capitalizeFirstLetter(this.props.category)}`;
  }

  // change api key later on, used someones' api key here :)
  updateNews = async () => {
    let endpoint = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=184f6cbcf1fd41bf92059744bd1ef359&pageSize=${this.props.pageSize}&page=${this.state.page}`;
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
    await this.setState({ page: this.state.page - 1 });
    this.updateNews();
  }

  handleNextClick = async () => {
    await this.setState({ page: this.state.page + 1 });
    this.updateNews();
  }

  fetchMoreData = async () => {
    this.setState({ page: this.state.page + 1 });
    let endpoint = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=184f6cbcf1fd41bf92059744bd1ef359&pageSize=${this.props.pageSize}&page=${this.state.page + 1}`;
    this.setState({ loading: true });
    let data = await fetch(endpoint);
    let parsedData = await data.json();
    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      totalResults: parsedData.totalResults,
      loading: false
    });
  };

  render() {
    return (
      <>
        <h2 className="container" style={{ margin: '30px 60px' }}>NewsNow - Top {this.capitalizeFirstLetter(this.props.category)} headlines</h2>
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner />}
        >
          <div className="container">
            <div className='row'>
              {this.state.articles.map((element) => {
                return <div className="col-md-4 my-3" key={element.url}>
                  <Newsitem title={element.title ? element.title : "Title Not Availible"} description={element.description} imgUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                </div>
              })}
            </div>
          </div>
        </InfiniteScroll>
    
      </>
    )
  }
}

export default News;