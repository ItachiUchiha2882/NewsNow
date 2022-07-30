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
            <Route path="/" element={<News setProgress={this.setProgress}  key="home" pageSize={this.pageSize} country="in" category="general" />}></Route>
            <Route path="/about" element={<News setProgress={this.setProgress}  key="about" pageSize={this.pageSize} country="in" category="general" />}></Route>
            <Route path="/general" element={<News setProgress={this.setProgress}  key="general" pageSize={this.pageSize} country="in" category="general" />}></Route>
            <Route path="/business" element={<News setProgress={this.setProgress}  key="business" pageSize={this.pageSize} country="in" category="business" />}></Route>
            <Route path="/entertainment" element={<News setProgress={this.setProgress}  key="entertainment" pageSize={this.pageSize} country="in" category="entertainment" />}></Route>
            <Route path="/health" element={<News setProgress={this.setProgress}  key="health" pageSize={this.pageSize} country="in" category="health" />}></Route>
            <Route path="/science" element={<News setProgress={this.setProgress}  key="science" pageSize={this.pageSize} country="in" category="science" />}></Route>
            <Route path="/sports" element={<News setProgress={this.setProgress}  key="sports" pageSize={this.pageSize} country="in" category="sports" />}></Route>
            <Route path="/technology" element={<News setProgress={this.setProgress}  key="technology" pageSize={this.pageSize} country="in" category="technology" />}></Route>
          </Routes>
        </BrowserRouter>
      </>
    )
  }
}

