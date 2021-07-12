import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import './FreeBoard.css';
import Post from '../../components/Post/Post';
import * as actionTypes from '../../store/actions/actionTypes';

const mapStateToProps = state => {
  return {
    storedPosts: state.pt.freePosts
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onDeleteFree: (id) => dispatch({ type: actionTypes.DELETE_POST_FREE, targetID: id}),
  };
};

class FreeBoard extends Component {
    state = {
      selectedFree: null,
    }

    clickPostHandler = (pt) => {
      this.props.history.push('/free/' + pt.id);
    }

    render() {
      const posts = this.props.storedPosts.map((pt) => {
        return (
          <Post key={pt.id} title={pt.title} 
          clickDetail={() => this.clickPostHandler(pt)} 
          clickDelete={() => this.props.onDeleteFree(pt.id)} />
        );
      });

      return (
        <div className='FreeBoard'>
          <div className='title'>{this.props.title}</div>
          <div className='Posts'>{posts}</div>
          <div className='add'>
            <NavLink to='/addfree' exact>Add Free</NavLink>
          </div>
          <div className='home'>
            <NavLink to='/home' exact>Back</NavLink>
          </div>
        </div>
      );
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(FreeBoard));