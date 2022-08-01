import React, {useState} from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const [tab, setTab] = useState(localStorage.getItem('nav'));
  
  return (
    <>
      <nav className="navbar fixed-top navbar-expand-lg bg-dark navbar-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">NewsNow</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item"><Link onClick={() => { setTab('home'); localStorage.setItem('nav', 'home');}} className={`nav-link ${tab === 'home' ? 'active' : ""}`} aria-current="page" to="/">Home</Link></li>
              <li className="nav-item"><Link onClick={() => { setTab('general'); localStorage.setItem('nav', 'general');}} className={`nav-link ${tab === 'general' ? 'active' : ""}`} to="/general">General</Link></li>
              <li className="nav-item"><Link onClick={() => { setTab('business'); localStorage.setItem('nav', 'business');}} className={`nav-link ${tab === 'business' ? 'active' : ""}`} to="/business">Business</Link></li>
              <li className="nav-item"><Link onClick={() => { setTab('entertainment'); localStorage.setItem('nav', 'entertainment');}} className={`nav-link ${tab === 'entertainment' ? 'active' : ""}`} to="/entertainment">Entertainment</Link></li>
              <li className="nav-item"><Link onClick={() => { setTab('health'); localStorage.setItem('nav', 'health');}} className={`nav-link ${tab === 'health' ? 'active' : ""}`} to="/health">Health</Link></li>
              <li className="nav-item"><Link onClick={() => { setTab('science'); localStorage.setItem('nav', 'science');}} className={`nav-link ${tab === 'science' ? 'active' : ""}`} to="/science">Science</Link></li>
              <li className="nav-item"><Link onClick={() => { setTab('sports'); localStorage.setItem('nav', 'sports');}} className={`nav-link ${tab === 'sports' ? 'active' : ""}`} to="/sports">Sports</Link></li>
              <li className="nav-item"><Link onClick={() => { setTab('technology'); localStorage.setItem('nav', 'technology');}} className={`nav-link ${tab === 'technology' ? 'active' : ""}`} to="/technology">Technology</Link></li>
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