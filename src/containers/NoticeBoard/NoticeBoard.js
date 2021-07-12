import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import './NoticeBoard.css';
import Post from '../../components/Post/Post';
import * as actionTypes from '../../store/actions/actionTypes';

const mapStateToProps = state => {
  return {
    storedPosts: state.pt.noticePosts
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onDeleteNotice: (id) => dispatch({ type: actionTypes.DELETE_POST_NOTICE, targetID: id }),
  };
};

class NoticeBoard extends Component {
    state = {
      selectedNotice: null,
    }

    clickPostHandler = (pt) => {
      this.props.history.push('/notice/' + pt.id);
    }

    render() {
      const posts = this.props.storedPosts.map((pt) => {
        return (
          <Post key={pt.id} title={pt.title} 
          clickDetail={() => this.clickPostHandler(pt)} 
          clickDelete={() => this.props.onDeleteNotice(pt.id)} />
        );
      });
      
      return (
        <div className='NoticeBoard'>
          <div className='title'>{this.props.title}</div>
          <div className='Posts'>{posts}</div>
          <div className='add'>
            <NavLink to='/addnotice' exact>Add Notice</NavLink>
          </div>
          <div className='home'>
            <NavLink to='/home' exact>Back</NavLink>
          </div>
        </div>
      );
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(NoticeBoard));
