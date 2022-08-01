# NewsNow 📰

**Date:**  01/08/2022

This includes [CWH ReactJS tutorials](https://www.youtube.com/playlist?list=PLu0W_9lII9agx66oZnT6IyhcMIbUMNMdt) from tut22 to tut40. Started on 11 july, 2022 and finished on 22 july, 2022.

Sorry, No deployment because of NEWSAPI restrictions. Access github repo [here](https://github.com/LeviAckerman2882/NewsNow) by [@LeviAckerman2882](https://github.com/LeviAckerman2882).

## Extra  : Fixing issues and features to add-on

- Show relevent news according to search input.

- Change title icon.

- Changing active class. 

Did it by using tab, setTab and setting active class by using ternary operator. We can solve the issue of tab getting disactivated by reloading, with the help of local storage. Do refer following articles : [mdn](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage) & [w3](https://www.w3schools.com/html/html5_webstorage.asp). 😊

## Tut40 : Using fetch API

Fixed navbar to top, removed dependency error refer [here](https://stackoverflow.com/questions/27732209/turning-off-eslint-rule-for-a-specific-line), modified `App.js` to class based component, updated title via `useEffect`.

### Final code:

`App.js`

```js
import './App.css';
import React, { useState } from 'react';
import Navbar from './components/Navbar';
import News from './components/News';
import LoadingBar from 'react-top-loading-bar';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

export default function App() {
  const pageSize = 6;
  const apiKey = process.env.REACT_APP_NEWS_MAD_API;
  const [progress, setProgress] = useState(0);

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <LoadingBar
          color='#f11946'
          height={3}
          progress={progress}
        />
        <Routes>
          <Route path="/" element={<News setProgress={setProgress} apiKey={apiKey} key="home" pageSize={pageSize} country="in" category="general" />}></Route>
          <Route path="/about" element={<News setProgress={setProgress} apiKey={apiKey} key="about" pageSize={pageSize} country="in" category="general" />}></Route>
          <Route path="/general" element={<News setProgress={setProgress} apiKey={apiKey} key="general" pageSize={pageSize} country="in" category="general" />}></Route>
          <Route path="/business" element={<News setProgress={setProgress} apiKey={apiKey} key="business" pageSize={pageSize} country="in" category="business" />}></Route>
          <Route path="/entertainment" element={<News setProgress={setProgress} apiKey={apiKey} key="entertainment" pageSize={pageSize} country="in" category="entertainment" />}></Route>
          <Route path="/health" element={<News setProgress={setProgress} apiKey={apiKey} key="health" pageSize={pageSize} country="in" category="health" />}></Route>
          <Route path="/science" element={<News setProgress={setProgress} apiKey={apiKey} key="science" pageSize={pageSize} country="in" category="science" />}></Route>
          <Route path="/sports" element={<News setProgress={setProgress} apiKey={apiKey} key="sports" pageSize={pageSize} country="in" category="sports" />}></Route>
          <Route path="/technology" element={<News setProgress={setProgress} apiKey={apiKey} key="technology" pageSize={pageSize} country="in" category="technology" />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}
```

`Navbar.js`

```js
import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <>
      <nav className="navbar fixed-top navbar-expand-lg bg-light">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">NewsNow</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item"><Link className="nav-link active" aria-current="page" to="/">Home</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/about">About</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/general">General</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/business">Business</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/entertainment">Entertainment</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/health">Health</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/science">Science</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/sports">Sports</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/technology">Technology</Link></li>
            </ul>
            {/* <form className="d-flex" role="search">
              <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
              <button className="btn btn-outline-success" type="submit">Search</button>
            </form> */}
          </div>
        </div>
      </nav>
    </>
  )
}
```

`News.js`

```js
import React, {useState, useEffect} from 'react';
import Newsitem from './Newsitem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

export default function News(props) {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const updateNews = async () => {
    props.setProgress(10);
    let endpoint = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&pageSize=${props.pageSize}&page=${page}`;
    setLoading(true);
    let data = await fetch(endpoint);
    props.setProgress(40);
    let parsedData = await data.json();
    props.setProgress(70);
    setArticles(parsedData.articles);
    setTotalResults(parsedData.totalResults);
    setLoading(false);
    props.setProgress(100);
  }

  useEffect( () => {
    document.title = `NewsNow - ${capitalizeFirstLetter(props.category)}`;
    // next comment removes error of dependency of `useEffect`.
    updateNews();
    // eslint-disable-next-line
  }, [])
  
  const fetchMoreData = async () => {
    let endpoint = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&pageSize=${props.pageSize}&page=${page+1}`;
    setPage(page + 1);
    let data = await fetch(endpoint);
    let parsedData = await data.json();
    setArticles(articles.concat(parsedData.articles));
    setTotalResults(parsedData.totalResults);
  };
  return (
    <>
      <div className='my-3'>
        <h2 style={{ margin: '30px 70px', marginTop: '70px' }}>NewsNow - Top {capitalizeFirstLetter(props.category)} headlines</h2>
        {loading && <Spinner />}
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={<Spinner />}
        >
          <div className="container">
            <div className='row'>
              {articles.map((element) => {
                return <div className="col-md-4 my-3" key={element.url}>
                  <Newsitem title={element.title} description={element.description} imgUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                </div>
              })}
            </div>
          </div>
        </InfiniteScroll>
      </div>
    </>
  )
}

News.defaultProps = {
  pageSize: 9,
  country: 'in',
  category: 'general'
}
News.propTypes = {
  pageSize: PropTypes.number,
  country: PropTypes.string,
  category: PropTypes.string
}
```

## Tut39 : Converting class based components to function based components

1. Replace 'class' by 'function', remove render and `.this`, pass `props` as argument to main function.

2. Move `propTypes` and `defaultProps` to end. Delete constructor and handle state with `useState`.

3. Replace componentDidMount by `useEffect`.

### Final code:

`Navbar.js`

```js
import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-light">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">NewsNow</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item"><Link className="nav-link active" aria-current="page" to="/">Home</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/about">About</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/general">General</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/business">Business</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/entertainment">Entertainment</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/health">Health</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/science">Science</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/sports">Sports</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/technology">Technology</Link></li>
            </ul>
            {/* <form className="d-flex" role="search">
              <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
              <button className="btn btn-outline-success" type="submit">Search</button>
            </form> */}
          </div>
        </div>
      </nav>
    </>
  )
}
```

`Newsitem.js`

```js
import React from 'react'

export function Newsitem(props) {
  const mystyle = {
    height: '250px',
  }
  const { title, description, imgUrl, newsUrl, author, date, source } = props;
  const defaultImage = "https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/Newsnow-logo_red.png/800px-Newsnow-logo_red.png";

  return (
    <>
      <div>
        <div className="card">
          <div>
            <span className="position-absolute top-0 badge pill bg-danger">{source}</span>
          </div>
          <img src={imgUrl ? imgUrl : defaultImage} style={mystyle} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{description}</p>
            <p className="card-text"><small className="text-muted">By {author ? author : 'Unknown'} on {new Date(date).toGMTString()}</small></p>
            <a href={newsUrl} target="_blank" rel="noreferrer" className="btn btn-sm btn-primary">Read more</a>
          </div>
        </div>
      </div>
    </>
  )
}

export default Newsitem;
```

`News.js`

```js
import React, {useState, useEffect} from 'react';
import Newsitem from './Newsitem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

export default function News(props) {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  // document.title = `NewsNow - ${capitalizeFirstLetter(props.category)}`;

  const updateNews = async () => {
    props.setProgress(10);
    let endpoint = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&pageSize=${props.pageSize}&page=${page}`;
    setLoading(true);
    let data = await fetch(endpoint);
    props.setProgress(40);
    let parsedData = await data.json();
    props.setProgress(70);
    setArticles(parsedData.articles);
    setTotalResults(parsedData.totalResults);
    setLoading(false);
    props.setProgress(100);
  }

  useEffect( () => {
    updateNews();
  }, [])
  
  const fetchMoreData = async () => {
    setPage(page + 1);
    let endpoint = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&pageSize=${props.pageSize}&page=${page+1}`;
    let data = await fetch(endpoint);
    let parsedData = await data.json();
    setArticles(articles.concat(parsedData.articles));
    setTotalResults(parsedData.totalResults);
  };
  return (
    <>
      <div className='my-3'>
        <h2 style={{ margin: '30px 70px' }}>NewsNow - Top {capitalizeFirstLetter(props.category)} headlines</h2>
        {loading && <Spinner />}
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={<Spinner />}
        >
          <div className="container">
            <div className='row'>
              {articles.map((element) => {
                return <div className="col-md-4 my-3" key={element.url}>
                  <Newsitem title={element.title} description={element.description} imgUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                </div>
              })}
            </div>
          </div>
        </InfiniteScroll>
      </div>
    </>
  )
}

News.defaultProps = {
  pageSize: 9,
  country: 'in',
  category: 'general'
}
News.propTypes = {
  pageSize: PropTypes.number,
  country: PropTypes.string,
  category: PropTypes.string
}
```

`Spinner.js`

```js
import React from 'react';
import loading from './loading.gif'

export default function Spinner() {
  return (
    <div className='text-center'>
      <img src={loading} alt='Loading'></img>
    </div>
  )
}
```

## Tut38 : React hooks

Refer this [Documentation](https://reactjs.org/docs/hooks-intro.html).

Basically, with hooks we can use features of class based components in function based components.

### Commonly used react hooks:

1. useState : updating states.

2. useEffect : performs side-effects. similar as ComponentDidMount().

3. useContext : used for context api.

4. useRef : used to keep reference of any tag in JSX.

## Tut37 : Hiding API key

Make `.env.local` file and add following to it.

```js
REACT_APP_NEWS_API='api_key'
```

Pass `apiKey` as props and make 'apiKey = process.env.REACT_APP_NEWS_API;' in `App.js`

### Final code:

`App.js`

```js
import './App.css';
import React, { Component } from 'react';
import Navbar from './components/Navbar';
import News from './components/News';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar';

export default class App extends Component {
  pageSize = 6;

  apiKey = process.env.REACT_APP_NEWS_MAD_API;

  state = {
    progress: 0
  }
  setProgress = (progress) => {
    this.setState({progress: progress})
  }

  render() {
    return (
      <>
        <BrowserRouter>
          <Navbar />
          <LoadingBar
            color='#f11946'
            height={3}
            progress={this.state.progress}
          />
          <Routes>
            <Route path="/" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="home" pageSize={this.pageSize} country="in" category="general" />}></Route>
            <Route path="/about" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="about" pageSize={this.pageSize} country="in" category="general" />}></Route>
            <Route path="/general" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="general" pageSize={this.pageSize} country="in" category="general" />}></Route>
            <Route path="/business" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="business" pageSize={this.pageSize} country="in" category="business" />}></Route>
            <Route path="/entertainment" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="entertainment" pageSize={this.pageSize} country="in" category="entertainment" />}></Route>
            <Route path="/health" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="health" pageSize={this.pageSize} country="in" category="health" />}></Route>
            <Route path="/science" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="science" pageSize={this.pageSize} country="in" category="science" />}></Route>
            <Route path="/sports" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="sports" pageSize={this.pageSize} country="in" category="sports" />}></Route>
            <Route path="/technology" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="technology" pageSize={this.pageSize} country="in" category="technology" />}></Route>
          </Routes>
        </BrowserRouter>
      </>
    )
  }
}
```

`News.js`

```js
import React, { Component } from 'react';
import Newsitem from './Newsitem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

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
      loading: true,
      page: 1,
      totalResults: 0
    }
    document.title = `NewsNow - ${this.capitalizeFirstLetter(this.props.category)}`;
  }

  updateNews = async () => {
    this.props.setProgress(10); 
    let endpoint = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&pageSize=${this.props.pageSize}&page=${this.state.page}`;
    this.setState({ loading: true });
    let data = await fetch(endpoint);
    this.props.setProgress(40);
    let parsedData = await data.json();
    this.props.setProgress(70);
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false
    });
    this.props.setProgress(100);
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
    let endpoint = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&pageSize=${this.props.pageSize}&page=${this.state.page + 1}`;
    // this.setState({ loading: true });
    let data = await fetch(endpoint);
    let parsedData = await data.json();
    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      totalResults: parsedData.totalResults,
      // loading: false
    });
  };

  render() {
    return (
      <>
        <div className='my-3'>
          <h2 style={{ margin: '30px 70px' }}>NewsNow - Top {this.capitalizeFirstLetter(this.props.category)} headlines</h2>
          {this.state.loading && <Spinner/>}
          <InfiniteScroll
            dataLength={this.state.articles.length}
            next={this.fetchMoreData}
            hasMore={this.state.articles.length !== this.state.totalResults}
            loader={<Spinner/>}
          >
            <div className="container">
              <div className='row'>
                {this.state.articles.map((element) => {
                  return <div className="col-md-4 my-3" key={element.url}>
                    <Newsitem title={element.title} description={element.description} imgUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                  </div>
                })}
              </div>
            </div>
          </InfiniteScroll>
        </div>
      </>
    )
  }
}

export default News;
```

`.env.local`

```js
REACT_APP_NEWS_MAD_API='[api_key]'
```

## Tut36 : Adding top loading bar and modifying badge style

1. Again install [package](https://www.npmjs.com/package/react-top-loading-bar). Can refer [github](https://github.com/klendi/react-top-loading-bar) also.

Use `npm i react-top-loading-bar --force` if some error in installation.

2. Adding `LoadingBar` code after Navbar component, then made `setProgress` function and updated progress in that function according to the given argument.

3. Made `state` object with 'Progress: 0'.

4. Now passing `setProgress` function to each `<News/>` component.

5. Now updating 'setProgress' prop inside `updateNews` by custom values. Done.

Modified badge style by changing classNames.

### Final code:

`App.js`

```js
import './App.css';
import React, { Component } from 'react';
import Navbar from './components/Navbar';
import News from './components/News';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar';

export default class App extends Component {
  pageSize = 6;
  state = {
    progress: 0
  }
  setProgress = (progress) => {
    this.setState({ progress: progress })
  }

  render() {
    return (
      <>
        <BrowserRouter>
          <Navbar />
          <LoadingBar
            color='#f11946'
            height={3}
            progress={this.state.progress}
          />
          <Routes>
            <Route path="/" element={<News setProgress={this.setProgress} key="home" pageSize={this.pageSize} country="in" category="general" />}></Route>
            <Route path="/about" element={<News setProgress={this.setProgress} key="about" pageSize={this.pageSize} country="in" category="general" />}></Route>
            <Route path="/general" element={<News setProgress={this.setProgress} key="general" pageSize={this.pageSize} country="in" category="general" />}></Route>
            <Route path="/business" element={<News setProgress={this.setProgress} key="business" pageSize={this.pageSize} country="in" category="business" />}></Route>
            <Route path="/entertainment" element={<News setProgress={this.setProgress} key="entertainment" pageSize={this.pageSize} country="in" category="entertainment" />}></Route>
            <Route path="/health" element={<News setProgress={this.setProgress} key="health" pageSize={this.pageSize} country="in" category="health" />}></Route>
            <Route path="/science" element={<News setProgress={this.setProgress} key="science" pageSize={this.pageSize} country="in" category="science" />}></Route>
            <Route path="/sports" element={<News setProgress={this.setProgress} key="sports" pageSize={this.pageSize} country="in" category="sports" />}></Route>
            <Route path="/technology" element={<News setProgress={this.setProgress} key="technology" pageSize={this.pageSize} country="in" category="technology" />}></Route>
          </Routes>
        </BrowserRouter>
      </>
    )
  }
}
```

`Newsitem.js`

```js
import React, { Component } from 'react'

export class Newsitem extends Component {
  mystyle = {
    height: '250px',
  }

  render() {
    const { title, description, imgUrl, newsUrl, author, date, source } = this.props;
    const defaultImage = "https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/Newsnow-logo_red.png/800px-Newsnow-logo_red.png";

    return (
      <>
        <div>
          <div className="card">
            <div>
              <span className="position-absolute top-0 badge pill bg-danger">{source}</span>
            </div>
            <img src={imgUrl ? imgUrl : defaultImage} style={this.mystyle} className="card-img-top" alt="..." />
            <div className="card-body">
              <h5 className="card-title">{title}</h5>
              <p className="card-text">{description}</p>
              <p className="card-text"><small className="text-muted">By {author ? author : 'Unknown'} on {new Date(date).toGMTString()}</small></p>
              <a href={newsUrl} target="_blank" rel="noreferrer" className="btn btn-sm btn-primary">Read more</a>
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default Newsitem;
```

`News.js`

```js
import React, { Component } from 'react';
import Newsitem from './Newsitem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

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
      loading: true,
      page: 1,
      totalResults: 0
    }
    document.title = `NewsNow - ${this.capitalizeFirstLetter(this.props.category)}`;
  }

  updateNews = async () => {
    this.props.setProgress(10); 
    let endpoint = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=00a8ff0ea82d49c99dbecce1be532618&pageSize=${this.props.pageSize}&page=${this.state.page}`;
    this.setState({ loading: true });
    let data = await fetch(endpoint);
    this.props.setProgress(40);
    let parsedData = await data.json();
    this.props.setProgress(70);
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false
    });
    this.props.setProgress(100);
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
    let endpoint = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=00a8ff0ea82d49c99dbecce1be532618&pageSize=${this.props.pageSize}&page=${this.state.page + 1}`;
    // this.setState({ loading: true });
    let data = await fetch(endpoint);
    let parsedData = await data.json();
    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      totalResults: parsedData.totalResults,
      // loading: false
    });
  };

  render() {
    return (
      <>
        <div className='my-3'>
          <h2 style={{ margin: '30px 70px' }}>NewsNow - Top {this.capitalizeFirstLetter(this.props.category)} headlines</h2>
          {this.state.loading && <Spinner/>}
          <InfiniteScroll
            dataLength={this.state.articles.length}
            next={this.fetchMoreData}
            hasMore={this.state.articles.length !== this.state.totalResults}
            loader={<Spinner/>}
          >
            <div className="container">
              <div className='row'>
                {this.state.articles.map((element) => {
                  return <div className="col-md-4 my-3" key={element.url}>
                    <Newsitem title={element.title} description={element.description} imgUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                  </div>
                })}
              </div>
            </div>
          </InfiniteScroll>
        </div>
      </>
    )
  }
}

export default News;
```

## Tut35 : Adding infinite scroll

Follow the video properly :). So much to write here. Some summary here.

1. Installed new package for infinite scroll. Look at [this site](https://www.npmjs.com/package/react-infinite-scroll-component).

2. Removed prev and next buttons. Also spinner and loading conditions.

3. Refer this [live example](https://codesandbox.io/s/yk7637p62z?file=/src/index.js) for code.

4. After the tutorials' code, do add one thing (this.state.page + 1 in url). So endpoint becomes,
```js
    let endpoint = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=00a8ff0ea82d49c99dbecce1be532618&pageSize=${this.props.pageSize}&page=${this.state.page + 1}`;
```
By this issue of repeating content and spinner at end will be solved.

5. Now to resolve issue that spinner isn't visible on first load of any category, do `loading: true` in constructor and delete `loading` from fetchMoreDate, also add condition that we removed earlier (showing spinner when loading is true.)

Do follow [video](https://www.youtube.com/watch?v=yLox5lhwaEU&list=PLu0W_9lII9agx66oZnT6IyhcMIbUMNMdt&index=36&t=1s) to fully grasp the concept.

### Final code:

`News.js`

```js
import React, { Component } from 'react';
import Newsitem from './Newsitem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

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
      loading: true,
      page: 1,
      totalResults: 0
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
    await this.setState({ page: this.state.page - 1 });
    this.updateNews();
  }

  handleNextClick = async () => {
    await this.setState({ page: this.state.page + 1 });
    this.updateNews();
  }

  fetchMoreData = async () => {
    this.setState({ page: this.state.page + 1 });
    let endpoint = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=00a8ff0ea82d49c99dbecce1be532618&pageSize=${this.props.pageSize}&page=${this.state.page + 1}`;
    // this.setState({ loading: true });
    let data = await fetch(endpoint);
    let parsedData = await data.json();
    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      totalResults: parsedData.totalResults,
      // loading: false
    });
  };

  render() {
    return (
      <>
        <div className='my-3'>
          <h2 style={{ margin: '30px 70px' }}>NewsNow - Top {this.capitalizeFirstLetter(this.props.category)} headlines</h2>
          {this.state.loading && <Spinner/>}
          <InfiniteScroll
            dataLength={this.state.articles.length}
            next={this.fetchMoreData}
            hasMore={this.state.articles.length !== this.state.totalResults}
            loader={<Spinner/>}
          >
            <div className="container">
              <div className='row'>
                {this.state.articles.map((element) => {
                  return <div className="col-md-4 my-3" key={element.url}>
                    <Newsitem title={element.title} description={element.description} imgUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                  </div>
                })}
              </div>
            </div>
          </InfiniteScroll>
        </div>
      </>
    )
  }
}

export default News;
```

## Tut34 : React component lifecycle and lifecycle methods

Firstly, we modified titles according to the category. Note that, it is necessary to write '(props)' in `constructor()` and `super()` to pass props to it.

### Component Lifecycle

- Mounting : Birth of component.
- Update : Growth of component.
- Unmounting : Death of component.

### Methods in React Component Lifecycle

- The `render()` method is used to render HTML of the component in react. This
method is required for a class based component to render the DOM. It runs
during the mounting and updating of your component. render() method should
be pure ie you cannot modify state inside it!

- The `componentDidMount()` method runs after the component output has been
rendered to the DOM. Fetching API, changing state etc. can be done here.

- The `componentDidUpdate()` method is invoked as soon as the updating
happens. The most common use case for the componentDidUpdate() method
is updating the DOM in response to prop or state changes.

- The `componentWillUnmount()` lifecycle method is called just before the
component is unmounted and destroyed. Usually used to perform cleanups.

Have a look at the [web diagram](https://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/). Follow [reactjs documentation](https://reactjs.org/docs/react-component.html) for more details.


## Tut33 : Refactoring news component to use same function

Made the new `updateNews` function and wrote the common code there. Don't forget add `await` before setState() in 'handle...Click' functions. So bug of 'getting the same page after next button click' gets removed.

### Final code:

`App.js`

```js
import './App.css';
import React, { Component } from 'react';
import Navbar from './components/Navbar';
import News from './components/News';
import {
  BrowserRouter,
  Routes, 
  Route,
} from "react-router-dom"; 

export default class App extends Component {
  pageSize = 15;
  render() {
    return (
      <>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<News key="home" pageSize={this.pageSize} country="in" category="general" />}></Route>
            <Route path="/about" element={<News key="about" pageSize={this.pageSize} country="in" category="general" />}></Route>
            <Route path="/general" element={<News key="general" pageSize={this.pageSize} country="in" category="general" />}></Route>
            <Route path="/business" element={<News key="business" pageSize={this.pageSize} country="in" category="business" />}></Route>
            <Route path="/entertainment" element={<News key="entertainment" pageSize={this.pageSize} country="in" category="entertainment" />}></Route>
            <Route path="/health" element={<News key="health" pageSize={this.pageSize} country="in" category="health" />}></Route>
            <Route path="/science" element={<News key="science" pageSize={this.pageSize} country="in" category="science" />}></Route>
            <Route path="/sports" element={<News key="sports" pageSize={this.pageSize} country="in" category="sports" />}></Route>
            <Route path="/technology" element={<News key="technology" pageSize={this.pageSize} country="in" category="technology" />}></Route>
          </Routes>
        </BrowserRouter>
      </>
    )
  }
}
```

`News.js`

```js
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
  constructor() {
    super();
    this.state = {
      articles: [],
      loading: false,
      page: 1
    }
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
          <h2 style={{margin : '30px 0px'}}>NewsNow - Top headlines</h2>
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
```

## Tut32 : Adding time, author and source

Added more props like `author`, `date` and `source`. For source used [bootstrap badges](https://getbootstrap.com/docs/5.2/components/badge/).

### Final code:

`Newsitem.js`

```js
import React, { Component } from 'react'

export class Newsitem extends Component {
  mystyle = {
    height: '250px',
  }

  render() {
    const { title, description, imgUrl, newsUrl, author, date, source } = this.props;
    const defaultImage = "https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/Newsnow-logo_red.png/800px-Newsnow-logo_red.png";

    return (
      <>
        <div>
          <div className="card">
            <span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{left : '12%'}}>{source}</span>
            <img src={imgUrl ? imgUrl : defaultImage} style={this.mystyle} className="card-img-top" alt="..." />
            <div className="card-body">
              <h5 className="card-title">{title}</h5>
              <p className="card-text">{description}</p>
              <p className="card-text"><small className="text-muted">By {author ? author : 'Unknown'} on {new Date(date).toGMTString()}</small></p>
              <a href={newsUrl} target="_blank" rel="noreferrer" className="btn btn-sm btn-primary">Read more</a>
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default Newsitem;
```

`News.js`

```js
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
  constructor() {
    super();
    this.state = {
      articles: [],
      loading: false,
      page: 1
    }
  }

  async componentDidMount() {
    let endpoint = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=00a8ff0ea82d49c99dbecce1be532618&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(endpoint);
    let parsedData = await data.json();
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false
    });
  }

  handlePrevClick = async () => {
    console.log("prev");
    let endpoint = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=00a8ff0ea82d49c99dbecce1be532618&pageSize=${this.props.pageSize}&page=${this.state.page - 1}`;
    this.setState({ loading: true });
    let data = await fetch(endpoint);
    let parsedData = await data.json();
    this.setState({
      articles: parsedData.articles,
      page: this.state.page - 1
    })
  }

  handleNextClick = async () => {
    console.log("next");
    let endpoint = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=00a8ff0ea82d49c99dbecce1be532618&pageSize=${this.props.pageSize}&page=${this.state.page + 1}`;
    this.setState({ loading: true });
    let data = await fetch(endpoint);
    let parsedData = await data.json();
    this.setState({
      articles: parsedData.articles,
      page: this.state.page + 1,
      loading: false
    })
  }

  render() {
    return (
      <>
        <div className='container my-3'>
          <h2 style={{margin : '30px 0px'}}>NewsNow - Top headlines</h2>
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
```

## Tut31 : Fetching newsapi category-wise

Followed [this doc](https://reactrouter.com/docs/en/v6/getting-started/overview) for fetching react routers. Even after all new syntax updation, it will not work until we add separate unique`key` to each of the news component. 

### Final code:

`App.js`

```js
import './App.css';
import React, { Component } from 'react';
import Navbar from './components/Navbar';
import News from './components/News';
// import ReactDOM from "react-dom/client";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom"; 

export default class App extends Component {
  render() {
    return (
      <>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<News key="home" pageSize={6} country="in" category="general" />}></Route>
            <Route path="/about" element={<News key="about" pageSize={6} country="in" category="general" />}></Route>
            <Route path="/general" element={<News key="general" pageSize={6} country="in" category="general" />}></Route>
            <Route path="/business" element={<News key="business" pageSize={6} country="in" category="business" />}></Route>
            <Route path="/entertainment" element={<News key="entertainment" pageSize={6} country="in" category="entertainment" />}></Route>
            <Route path="/health" element={<News key="health" pageSize={6} country="in" category="health" />}></Route>
            <Route path="/science" element={<News key="science" pageSize={6} country="in" category="science" />}></Route>
            <Route path="/sports" element={<News key="sports" pageSize={6} country="in" category="sports" />}></Route>
            <Route path="/technology" element={<News key="technology" pageSize={6} country="in" category="technology" />}></Route>
          </Routes>
        </BrowserRouter>
      </>
    )
  }
}   
```

`Navbar.js`

```js
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class Navbar extends Component {
  render() {
    return (
      <>
        <nav className="navbar navbar-expand-lg bg-light">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">NewsNow</Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item"><Link className="nav-link active" aria-current="page" to="/">Home</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/about">About</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/general">General</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/business">Business</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/entertainment">Entertainment</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/health">Health</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/science">Science</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/sports">Sports</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/technology">Technology</Link></li>
              </ul>
              <form className="d-flex" role="search">
                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                <button className="btn btn-outline-success" type="submit">Search</button>
              </form>
            </div>
          </div>
        </nav>
      </>
    )
  }
}

export default Navbar;
```

## Tut30 : Adding categories and propTypes

We made the `country` a props, then added `category` as props. Set the defaultProps and propTypes by [new syntax](https://reactjs.org/docs/typechecking-with-proptypes.html). Modified changes in urls w.r.t that.

### Final code:

`App.js`

```js
import './App.css';
import React, { Component } from 'react';
import Navbar from './components/Navbar';
import News from './components/News';

export default class App extends Component {
  render() {
    return (
      <>
        <Navbar/>
        <News pageSize={6} country="in" category="general" />
      </>   
    )
  }
}
```

`Navbar.js`

```js
import React, { Component } from 'react';

export class Navbar extends Component {
  render() {
    return (
      <>
        <nav className="navbar navbar-expand-lg bg-light">
          <div className="container-fluid">
            <a className="navbar-brand" href="/">NewsNow</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item"><a className="nav-link active" aria-current="page" href="/">Home</a></li>
                <li className="nav-item"><a className="nav-link" href="/about">About</a></li>
                <li className="nav-item"><a className="nav-link" href="/general">General</a></li>
                <li className="nav-item"><a className="nav-link" href="/business">Business</a></li>
                <li className="nav-item"><a className="nav-link" href="/entertainment">Entertainment</a></li>
                <li className="nav-item"><a className="nav-link" href="/health">Health</a></li>
                <li className="nav-item"><a className="nav-link" href="/science">Science</a></li>
                <li className="nav-item"><a className="nav-link" href="/sports">Sports</a></li>
                <li className="nav-item"><a className="nav-link" href="/technology">Technology</a></li>
              </ul>
              <form className="d-flex" role="search">
                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                <button className="btn btn-outline-success" type="submit">Search</button>
              </form>
            </div>
          </div>
        </nav>
      </>
    )
  }
}

export default Navbar;
```

`Newsitem.js`

```js
import React, { Component } from 'react'

export class Newsitem extends Component {
  mystyle = {
    height: '250px',
  }

  render() {
    const { title, description, imgUrl, newsUrl } = this.props;
    const defaultImage = "https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/Newsnow-logo_red.png/800px-Newsnow-logo_red.png";

    return (
      <>
        <div>
          <div className="card">
            <img src={imgUrl?imgUrl:defaultImage} style={this.mystyle} className="card-img-top" alt="..." />
            <div className="card-body">
              <h5 className="card-title">{title}</h5>
              <p className="card-text">{description}</p>
              <a href={newsUrl} target="_blank" rel="noreferrer" className="btn btn-sm btn-primary">Read more</a>
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default Newsitem;
```

`News.js`

```js
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
  constructor() {
    super();
    this.state = {
      articles: [],
      loading: false,
      page: 1
    }
  }

  async componentDidMount() {
    let endpoint = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=00a8ff0ea82d49c99dbecce1be532618&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(endpoint);
    let parsedData = await data.json();
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false
    });
  }

  handlePrevClick = async () => {
    console.log("prev");
    let endpoint = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=00a8ff0ea82d49c99dbecce1be532618&pageSize=${this.props.pageSize}&page=${this.state.page - 1}`;
    this.setState({ loading: true });
    let data = await fetch(endpoint);
    let parsedData = await data.json();
    this.setState({
      articles: parsedData.articles,
      page: this.state.page - 1
    })
  }

  handleNextClick = async () => {
    console.log("next");
    let endpoint = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=00a8ff0ea82d49c99dbecce1be532618&pageSize=${this.props.pageSize}&page=${this.state.page + 1}`;
    this.setState({ loading: true });
    let data = await fetch(endpoint);
    let parsedData = await data.json();
    this.setState({
      articles: parsedData.articles,
      page: this.state.page + 1,
      loading: false
    })
  }

  render() {
    return (
      <>
        <div className='container my-3'>
          <h2 style={{margin : '30px 0px'}}>NewsNow - Top headlines</h2>
          {this.state.loading && <Spinner />}
          <div className='row'>
            {/* this ensures that content is gone, when loading. */}
            {!this.state.loading && this.state.articles.map((element) => {
              return <div className="col-md-4 my-3" key={element.url}>
                <Newsitem title={element.title} description={element.description} imgUrl={element.urlToImage} newsUrl={element.url} />
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
```

## Tut29 : Adding loading spinner & some modifications

Firstly, sent the `pageSize` as props. Then downloaded spinner gif. Added it in 'src/components' folder, also made `Spinner.js`, and made it visible when `loading: true`. Also added the functionality, while loading... no content, by `{!this.state.loading && ...` logic.

You can reduce loading speed of API in 'Networks/throttling' section.

`App.js`

```js
import './App.css';
import React, { Component } from 'react';
import Navbar from './components/Navbar';
import News from './components/News';

export default class App extends Component {
  render() {
    return (
      <>
        <Navbar/>
        <News pageSize={6} />
      </>   
    )
  }
}
```

`Spinner.js`

```js
import React, { Component } from 'react';
import loading from './loading.gif'

export default class Spinner extends Component {
  render() {
    return (
      <div className='text-center'>
        <img src={loading} alt='Loading'></img>
      </div>
    )
  }
}
```

`News.js`

```js
import React, { Component } from 'react';
import Newsitem from './Newsitem'
import Spinner from './Spinner';

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
    let endpoint = `https://newsapi.org/v2/top-headlines?country=in&apiKey=00a8ff0ea82d49c99dbecce1be532618&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(endpoint);
    let parsedData = await data.json();
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false
    });
  }

  handlePrevClick = async () => {
    console.log("prev");
    let endpoint = `https://newsapi.org/v2/top-headlines?country=in&apiKey=00a8ff0ea82d49c99dbecce1be532618&pageSize=${this.props.pageSize}&page=${this.state.page - 1}`;
    this.setState({ loading: true });
    let data = await fetch(endpoint);
    let parsedData = await data.json();
    this.setState({
      articles: parsedData.articles,
      page: this.state.page - 1
    })
  }

  handleNextClick = async () => {
    console.log("next");
    let endpoint = `https://newsapi.org/v2/top-headlines?country=in&apiKey=00a8ff0ea82d49c99dbecce1be532618&pageSize=${this.props.pageSize}&page=${this.state.page + 1}`;
    this.setState({ loading: true });
    let data = await fetch(endpoint);
    let parsedData = await data.json();
    this.setState({
      articles: parsedData.articles,
      page: this.state.page + 1,
      loading: false
    })
  }

  render() {
    return (
      <>
        <div className='container my-3'>
          <h2>NewsNow - Top headlines</h2>
          {this.state.loading && <Spinner />}
          <div className='row'>
            {/* this ensures that content is gone, when loading. */}
            {!this.state.loading && this.state.articles.map((element) => {
              return <div className="col-md-4 my-3" key={element.url}>
                <Newsitem title={element.title} description={element.description} imgUrl={element.urlToImage} newsUrl={element.url} />
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
```

## Tut28 : Adding previous and next buttons

We added buttons and handled onClick event by modifying fetch logic. Disabled `previous` button when page<1 and `next` button when totalResults/pageSize is greater that page number + 1.

Along with if-else in `handleNextClick`, I added that logic in disbled={...} for next button.

`News.js`

```js
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
```

## Tut27 : Using fetch API

Fetched news from [newsapi](https://newsapi.org/). Then just some small changes to handle the cases like where urlToImage is null etc.

Syntax for [AJAX using `.then`](https://reactjs.org/docs/faq-ajax.html)

```js
componentDidMount() {
    const endpoint = "https://newsapi.org/v2/top-headlines?country=in&apiKey=00a8ff0ea82d49c99dbecce1be532618";
    fetch(endpoint)
      .then(res => res.json())
      .then((result) => {
        this.setState({
          articles: result.articles
        })
      });
  }
```

Can use this style for title and description of news.

```js
styleForTnD = {maxWidth: '100%',
    display: '-webkit-box',
    WebkitBoxOrient: 'vertical',
    WebkitLineClamp: 2,
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  }
```

### Final code: 

`News.js`
```js
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
```

`Newsitem.js`

```js
import React, { Component } from 'react'

export class Newsitem extends Component {
  mystyle = {
    height: '180px',
  }

  render() {
    const { title, description, imgUrl, newsUrl } = this.props;
    const defaultImage = "https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/Newsnow-logo_red.png/800px-Newsnow-logo_red.png";

    return (
      <>
        <div>
          <div className="card" style={{ width: '18rem' }}>
            <img src={imgUrl?imgUrl:defaultImage} style={this.mystyle} className="card-img-top" alt="..." />
            <div className="card-body">
              <h5 className="card-title">{title}</h5>
              <p className="card-text">{description}</p>
              <a href={newsUrl} target="_blank" rel="noreferrer" className="btn btn-sm btn-primary">Read more</a>
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default Newsitem;
```

## Tut26 : Looping through array to display newsitems

We iterated elements of article by `.map()` method and gave unique key to each element. then after all things, aligned cards by limiting [no. of characters](https://leviackerman2882.github.io/TextUtils/).

`News.js`

```js
import React, { Component } from 'react';
import Newsitem from './Newsitem'

export class News extends Component {
  articles = [
    {
      "source": {
        "id": "bbc-sport",
        "name": "BBC Sport"
      },
      "author": "BBC Sport",
      "title": "Shane Warne memorial - watch & follow updates",
      "description": "Watch live coverage and follow text updates and tributes from the state memorial for Australian cricket legend Shane Warne at the Melbourne Cricket Ground.",
      "url": "http://www.bbc.co.uk/sport/live/cricket/60916236",
      "urlToImage": "https:////m.files.bbci.co.uk/modules/bbc-morph-sport-seo-meta/1.22.0/images/bbc-sport-logo.png",
      "publishedAt": "2022-03-30T08:22:26.498888Z",
      "content": "Former England bowler and BBC cricket presenter Isa Guha, who became a colleague of Warne's in the commentary box: \"It has been a strange few weeks - a lot of shock and then we did our own tribute at… [+396 chars]"
    },
    {
      "source": {
        "id": "espn-cric-info",
        "name": "ESPN Cric Info"
      },
      "author": null,
      "title": "PCB hands Umar Akmal three-year ban from all cricket | ESPNcricinfo.com",
      "description": "Penalty after the batsman pleaded guilty to not reporting corrupt approaches | ESPNcricinfo.com",
      "url": "http://www.espncricinfo.com/story/_/id/29103103/pcb-hands-umar-akmal-three-year-ban-all-cricket",
      "urlToImage": "https://a4.espncdn.com/combiner/i?img=%2Fi%2Fcricket%2Fcricinfo%2F1099495_800x450.jpg",
      "publishedAt": "2020-04-27T11:41:47Z",
      "content": "Umar Akmal's troubled cricket career has hit its biggest roadblock yet, with the PCB handing him a ban from all representative cricket for three years after he pleaded guilty of failing to report det… [+1506 chars]"
    },
    {
      "source": {
        "id": "espn-cric-info",
        "name": "ESPN Cric Info"
      },
      "author": null,
      "title": "What we learned from watching the 1992 World Cup final in full again | ESPNcricinfo.com",
      "description": "Wides, lbw calls, swing - plenty of things were different in white-ball cricket back then | ESPNcricinfo.com",
      "url": "http://www.espncricinfo.com/story/_/id/28970907/learned-watching-1992-world-cup-final-full-again",
      "urlToImage": "https://a4.espncdn.com/combiner/i?img=%2Fi%2Fcricket%2Fcricinfo%2F1219926_1296x729.jpg",
      "publishedAt": "2020-03-30T15:26:05Z",
      "content": "Last week, we at ESPNcricinfo did something we have been thinking of doing for eight years now: pretend-live ball-by-ball commentary for a classic cricket match. We knew the result, yes, but we tried… [+6823 chars]"
    }
  ];

  constructor() {
    super();
    this.state = {
      articles: this.articles,
      loading: false
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
                <Newsitem title={element.title.slice(0, 40)} description={element.description.slice(0, 80)} imgUrl={element.urlToImage} newsUrl={element.url}/>
              </div>
            })};
          </div>
        </div>
      </>
    )
  }
}

export default News;
```

`Newsitem.js`

```js
import React, { Component } from 'react'

export class Newsitem extends Component {
  mystyle = {
    height: '180px',
  }

  render() {
    let { title, description, imgUrl, newsUrl } = this.props;
    return (
      <>
        <div>
          <div className="card" style={{ width: '18rem' }}>
            <img src={imgUrl} style={this.mystyle} className="card-img-top" alt="..." />
            <div className="card-body">
              <h5 className="card-title">{title}...</h5>
              <p className="card-text">{description}...</p>
              <a href={newsUrl} target="_blank" rel="noreferrer" className="btn btn-sm btn-primary">Read more</a>
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default Newsitem;
```

## Tut25 : Understanding state in class based components

Documentation for this one is good to follow, for [state](https://reactjs.org/docs/state-and-lifecycle.html#adding-local-state-to-a-class) and for 
[constructor()](https://reactjs.org/docs/react-component.html).

Note that you should not call `setState()` in the `constructor()`. Instead, if your component needs to use local state, assign the initial state to `this.state` directly in the constructor. Constructor is the only place where you should assign `this.state` directly. In all other methods, you need to use `this.setState()` instead.

`News.js`
```js
import React, { Component } from 'react';
import Newsitem from './Newsitem'

export class News extends Component {
    articles = [
    {
      "source": {
        "id": "bbc-sport",
        "name": "BBC Sport"
      },
      "author": "BBC Sport",
      "title": "Shane Warne memorial - watch & follow updates",
      "description": "Watch live coverage and follow text updates and tributes from the state memorial for Australian cricket legend Shane Warne at the Melbourne Cricket Ground.",
      "url": "http://www.bbc.co.uk/sport/live/cricket/60916236",
      "urlToImage": "https:////m.files.bbci.co.uk/modules/bbc-morph-sport-seo-meta/1.22.0/images/bbc-sport-logo.png",
      "publishedAt": "2022-03-30T08:22:26.498888Z",
      "content": "Former England bowler and BBC cricket presenter Isa Guha, who became a colleague of Warne's in the commentary box: \"It has been a strange few weeks - a lot of shock and then we did our own tribute at… [+396 chars]"
    },
    {
      "source": {
        "id": "espn-cric-info",
        "name": "ESPN Cric Info"
      },
      "author": null,
      "title": "PCB hands Umar Akmal three-year ban from all cricket | ESPNcricinfo.com",
      "description": "Penalty after the batsman pleaded guilty to not reporting corrupt approaches | ESPNcricinfo.com",
      "url": "http://www.espncricinfo.com/story/_/id/29103103/pcb-hands-umar-akmal-three-year-ban-all-cricket",
      "urlToImage": "https://a4.espncdn.com/combiner/i?img=%2Fi%2Fcricket%2Fcricinfo%2F1099495_800x450.jpg",
      "publishedAt": "2020-04-27T11:41:47Z",
      "content": "Umar Akmal's troubled cricket career has hit its biggest roadblock yet, with the PCB handing him a ban from all representative cricket for three years after he pleaded guilty of failing to report det… [+1506 chars]"
    },
    {
      "source": {
        "id": "espn-cric-info",
        "name": "ESPN Cric Info"
      },
      "author": null,
      "title": "What we learned from watching the 1992 World Cup final in full again | ESPNcricinfo.com",
      "description": "Wides, lbw calls, swing - plenty of things were different in white-ball cricket back then | ESPNcricinfo.com",
      "url": "http://www.espncricinfo.com/story/_/id/28970907/learned-watching-1992-world-cup-final-full-again",
      "urlToImage": "https://a4.espncdn.com/combiner/i?img=%2Fi%2Fcricket%2Fcricinfo%2F1219926_1296x729.jpg",
      "publishedAt": "2020-03-30T15:26:05Z",
      "content": "Last week, we at ESPNcricinfo did something we have been thinking of doing for eight years now: pretend-live ball-by-ball commentary for a classic cricket match. We knew the result, yes, but we tried… [+6823 chars]"
    }
  ];

  constructor(){
    super();
    this.state = {
      articles : this.articles,
      loading : false
    }
  }

  render() {
    return (
      <>
        <div className='container my-3'>
          <h2>Top headlines</h2>
          <div className='row'>
            <div className="col-md-4 my-3">
              <Newsitem title="title" description="description" imgUrl="https:////m.files.bbci.co.uk/modules/bbc-morph-sport-seo-meta/1.22.0/images/bbc-sport-logo.png"/>
            </div>
            <div className="col-md-4 my-3">
              <Newsitem title="title" description="description"/>
            </div>
            <div className="col-md-4 my-3">
              <Newsitem title="title" description="description"/>
            </div>
            <div className="col-md-4 my-3">
              <Newsitem title="title" description="description"/>
            </div>
            <div className="col-md-4 my-3">
              <Newsitem title="title" description="description"/>
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default News;
```

`Newsitem.js`

```js
import React, { Component } from 'react'

export class Newsitem extends Component {
  render() {
    let {title, description, imgUrl} = this.props;
    return (
      <>
        <div>
          <div className="card" style={{width: '18rem'}}>
            <img src={imgUrl} className="card-img-top" alt="..."/>
              <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <p className="card-text">{description}</p>
                <a href="/" className="btn btn-sm btn-primary">Read more</a>
              </div>
          </div>
        </div>
      </>
    )
  }
}

export default Newsitem;
```

## Tut24 : Fetching API key from newsapi

Went to [newsapi](https://newsapi.org/) and added a filter 'cricket' then stored the response in sampleOutput.json file. Learned new way to write props by [destructuring syntax](https://www.geeksforgeeks.org/destructuring-of-props-in-reactjs/#:~:text=In%20destructuring%2C%20It%20does%20not,makes%20the%20code%20more%20clear.).
Aligned the bootstrap cards by using classes of bootstrap for grid.

`App.js`

```js
import './App.css';
import React, { Component } from 'react';
import Navbar from './components/Navbar';
import News from './components/News';

export default class App extends Component {
  render() {
    return (
      <>
        <Navbar/>
        <News/>
      </>   
    )
  }
}
```

`Navbar.js`

```js
import React, { Component } from 'react';

export class Navbar extends Component {
  render() {
    return (
      <>
        <nav className="navbar navbar-expand-lg bg-light">
          <div className="container-fluid">
            <a className="navbar-brand" href="/">Navbar</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <a className="nav-link active" aria-current="page" href="/">Home</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/about">About</a>
                </li>
              </ul>
              <form className="d-flex" role="search">
                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                <button className="btn btn-outline-success" type="submit">Search</button>
              </form>
            </div>
          </div>
        </nav>
      </>
    )
  }
}

export default Navbar;
```

`News.js`

```js
import React, { Component } from 'react';
import Newsitem from './Newsitem'

export class News extends Component {
  render() {
    return (
      <>
        <div className='container my-3'>
          <h2>Top headlines</h2>
          <div className='row'>
            <div className="col-md-4 my-3">
              <Newsitem title="title" description="description"/>
            </div>
            <div className="col-md-4 my-3">
              <Newsitem title="title" description="description"/>
            </div>
            <div className="col-md-4 my-3">
              <Newsitem title="title" description="description"/>
            </div>
            <div className="col-md-4 my-3">
              <Newsitem title="title" description="description"/>
            </div>
            <div className="col-md-4 my-3">
              <Newsitem title="title" description="description"/>
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default News;
```

`Newsitem.js`

```js
import React, { Component } from 'react'

export class Newsitem extends Component {
  render() {
    // props with destructuring syntax.
    let {title, description} = this.props;
    return (
      <>
        <div>
          <div className="card" style={{width: '18rem'}}>
            <img src="https:////m.files.bbci.co.uk/modules/bbc-morph-sport-seo-meta/1.22.0/images/bbc-sport-logo.png" className="card-img-top" alt="..."/>
              <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <p className="card-text">{description}</p>
                <a href="/" className="btn btn-primary">Read more</a>
              </div>
          </div>
        </div>
      </>
    )
  }
}

export default Newsitem;
```

`sampleOutput.json`

```js
{
  "status": "ok",
  "totalResults": 3,
  "articles": [
    {
      "source": {
        "id": "bbc-sport",
        "name": "BBC Sport"
      },
      "author": "BBC Sport",
      "title": "Shane Warne memorial - watch & follow updates",
      "description": "Watch live coverage and follow text updates and tributes from the state memorial for Australian cricket legend Shane Warne at the Melbourne Cricket Ground.",
      "url": "http://www.bbc.co.uk/sport/live/cricket/60916236",
      "urlToImage": "https:////m.files.bbci.co.uk/modules/bbc-morph-sport-seo-meta/1.22.0/images/bbc-sport-logo.png",
      "publishedAt": "2022-03-30T08:22:26.498888Z",
      "content": "Former England bowler and BBC cricket presenter Isa Guha, who became a colleague of Warne's in the commentary box: \"It has been a strange few weeks - a lot of shock and then we did our own tribute at… [+396 chars]"
    },
    {
      "source": {
        "id": "espn-cric-info",
        "name": "ESPN Cric Info"
      },
      "author": null,
      "title": "PCB hands Umar Akmal three-year ban from all cricket | ESPNcricinfo.com",
      "description": "Penalty after the batsman pleaded guilty to not reporting corrupt approaches | ESPNcricinfo.com",
      "url": "http://www.espncricinfo.com/story/_/id/29103103/pcb-hands-umar-akmal-three-year-ban-all-cricket",
      "urlToImage": "https://a4.espncdn.com/combiner/i?img=%2Fi%2Fcricket%2Fcricinfo%2F1099495_800x450.jpg",
      "publishedAt": "2020-04-27T11:41:47Z",
      "content": "Umar Akmal's troubled cricket career has hit its biggest roadblock yet, with the PCB handing him a ban from all representative cricket for three years after he pleaded guilty of failing to report det… [+1506 chars]"
    },
    {
      "source": {
        "id": "espn-cric-info",
        "name": "ESPN Cric Info"
      },
      "author": null,
      "title": "What we learned from watching the 1992 World Cup final in full again | ESPNcricinfo.com",
      "description": "Wides, lbw calls, swing - plenty of things were different in white-ball cricket back then | ESPNcricinfo.com",
      "url": "http://www.espncricinfo.com/story/_/id/28970907/learned-watching-1992-world-cup-final-full-again",
      "urlToImage": "https://a4.espncdn.com/combiner/i?img=%2Fi%2Fcricket%2Fcricinfo%2F1219926_1296x729.jpg",
      "publishedAt": "2020-03-30T15:26:05Z",
      "content": "Last week, we at ESPNcricinfo did something we have been thinking of doing for eight years now: pretend-live ball-by-ball commentary for a classic cricket match. We knew the result, yes, but we tried… [+6823 chars]"
    }
  ]
}
```

## Tut23 : Component structure of NewsNow

Made components here and just copy-pasting navbar code from bootstrap.
`rce` shortcut used to import react class export component. And we imported `NewsComponents.js` in `News.js`, not in App.js

## Tut22 : Project setup and class based components

Started new project NewsNow. Used `rcc` command shortcut to import class based components. We can't use let or const to declare variable, just var_name and var_value.
And if we have to render them inside return then do it by `{this.var_name}`.

That's all folks! ❤️

