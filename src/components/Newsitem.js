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