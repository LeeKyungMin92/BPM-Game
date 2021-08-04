import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './Home.css'

class Home extends Component {
  render() {
    return (
      <div className="Home">
        <div className="Title">
          <h1>{this.props.title}</h1>
        </div>
        <div className="Menu">
          <NavLink to="/notice" exact>Notice</NavLink>
        </div>
        <div className="Menu">
          <NavLink to="/free" exact>Free</NavLink>
        </div>
        <div className="Menu">
          <NavLink to="/game" exact>BPM Game</NavLink>
        </div>
      </div>
    );
  }
}
export default Home;
