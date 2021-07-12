import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class Home extends Component {
  render() {
    return (
      <div className="Home">
        <div className="title">{this.props.title}</div>
        <div className="notice"><NavLink to="/notice" exact>Notice</NavLink></div>
        <div className="free"><NavLink to="/free" exact>Free</NavLink></div>
      </div>
    );
  }
}
export default Home;
