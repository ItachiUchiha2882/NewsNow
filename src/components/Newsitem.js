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