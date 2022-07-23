import React, { Component } from 'react'
import NewsComponents from './NewsComponents'

export class News extends Component {
  render() {
    return (
      <>
        <div>News here.</div>
        <NewsComponents/>
        <NewsComponents/>
        <NewsComponents/>
        <NewsComponents/>
        <NewsComponents/>
        <NewsComponents/>
      </>
      
    )
  }
}

export default News