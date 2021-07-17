import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Detail.css';
import * as actionTypes from '../../../store/actions/actionTypes';
import { withRouter } from 'react-router';

class Detail extends Component {
  componentDidMount() {
    this.props.onGetPost(parseInt(this.props.match.params.id));
  }

  render() {
    let id = null; let title = ''; let content = '';
    if (this.props.selectedPost) {
      id = this.props.selectedPost.id;
      title = this.props.selectedPost.title;
      content = this.props.selectedPost.content;
    }
    
    if (!id) {
      return (
        <div className='NotFound'>
          <h1>Not Found</h1>
          <h2>Invalid Post ID</h2>
        </div>
        );
    }

    return (
      <div className='Detail'>
        <div className='row'>
          <div className='left'>
            ID:
          </div>
          <div className='right'>
            {id}
          </div>
        </div>
        <div className='row'>
          <div className='left'>
            Title:
          </div>
          <div className='right'>
            {title}
          </div>
        </div>
        <div className='row'>
          <div className='left'>
            Content:
          </div>
          <div className='right'>
            {content}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  selectedPost: state.pt.selectedPost,
});

const mapDispatchToProps = (dispatch) => {
  let pathname = window.location.pathname;

  if (pathname.slice(1, 7) === 'notice') {
    return {
      onGetPost: (id) => dispatch({ type: actionTypes.GET_POST, targetID: id, boardType: 'notice' }),
    };
  } else if (pathname.slice(1,5) === 'free') {
    return {
      onGetPost: (id) => dispatch({ type: actionTypes.GET_POST, targetID: id, boardType: 'free' }),
    };
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Detail));
