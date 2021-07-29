import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import './Board.css';
import Post from '../../components/Post/Post';
import * as actionCreators from '../../store/actions/index';

class Board extends Component {
  state = {
      selectedPost: null,
  }

  componentDidMount() {
    this.props.onGetAll();
  }
  
  clickPostHandler = (pt) => {
    let boardtype = '' + this.props.boardType;
    boardtype = boardtype.toString().toLowerCase();
    this.props.history.push('/' + boardtype + '/' + pt.id);
  }

  render() {
    const posts = this.props.storedPosts.map((pt) => {
      return (
        <Post key={pt.id} title={pt.title} 
        clickDetail={() => this.clickPostHandler(pt)} 
        clickDelete={() => this.props.onDeletePost(pt.id)} />
      );
    });

    let currentPath = window.location.pathname.toString().split('/')[1];
    return (
      <div className='Board'>
        <div className='boardType'>{this.props.boardType}</div>
        <div className='Posts'>{posts}</div>
        <div className='add'>
          <NavLink to={currentPath + '/add'} exact>Add {this.props.boardType}</NavLink>
        </div>
        <div className='home'>
          <NavLink to='/home' exact>Back</NavLink>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  let boardtype = '' + ownProps.boardType;
  boardtype = boardtype.toString().toLowerCase();
  return {
    storedPosts: state.pt[boardtype]
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  let boardtype = '' + ownProps.boardType;
  boardtype = boardtype.toString().toLowerCase();
  return {
    onDeletePost: (id) => {dispatch(actionCreators.deletePost(boardtype, id))},
    onGetAll: () => dispatch(actionCreators.getPosts(boardtype)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Board));
