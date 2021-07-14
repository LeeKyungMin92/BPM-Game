import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import './Board.css';
import Post from '../../components/Post/Post';
import * as actionTypes from '../../store/actions/actionTypes';

class Board extends Component {
  state = {
      selectedPost: null,
  }
  
  clickPostHandler = (pt) => {
    let pathname = window.location.pathname;
    if (pathname.charAt(pathname.length - 1) === '/') {
      this.props.history.push(pathname + pt.id);
    } else {
      this.props.history.push(pathname + '/' + pt.id);
    }
  }

  render() {
    const posts = this.props.storedPosts.map((pt) => {
      return (
        <Post key={pt.id} title={pt.title} 
        clickDetail={() => this.clickPostHandler(pt)} 
        clickDelete={() => this.props.onDeletePost(pt.id)} />
      );
    });

    return (
      <div className='Board'>
        <div className='title'>{this.props.title}</div>
        <div className='Posts'>{posts}</div>
        <div className='add'>
          <NavLink to={window.location.pathname + '/add'} exact>Add {this.props.title}</NavLink>
        </div>
        <div className='home'>
          <NavLink to='/home' exact>Back</NavLink>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  switch (ownProps.title) {
    case "Notice": 
      return {
        storedPosts: state.pt.noticePosts
      };

    case "Free": 
      return {
        storedPosts: state.pt.freePosts
      };

    default: 
      break;
  }
};

const mapDispatchToProps = (dispatch, ownProps) => {
  switch (ownProps.title) {
    case "Notice": 
      return {
        onDeletePost: (id) => {dispatch({ type: actionTypes.DELETE_POST_NOTICE, targetID: id })},
      };
    
    case "Free": 
      return {
        onDeletePost: (id) => {dispatch({ type: actionTypes.DELETE_POST_FREE, targetID: id })},
      };
    
    default: break;
  }
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Board));
