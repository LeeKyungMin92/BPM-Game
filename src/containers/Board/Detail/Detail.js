import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { NavLink } from 'react-router-dom';
import './Detail.css';
import * as actionCreators from '../../../store/actions/index';

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
    
    if (id == null) {
      return (
        <div className='NotFound'>
          <h1>Not Found</h1>
          <h2>Invalid Post ID</h2>
        </div>
        );
    }

    let prevPath = window.location.pathname.toString().split('/')[1];
    
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
        <div className='row'>
          <div className='left'>
            <NavLink to={prevPath} exact>Back</NavLink>
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
  let prevPath = window.location.pathname.toString().split('/')[1];
  return {
    onGetPost: (id) => dispatch(actionCreators.getPost(prevPath, id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Detail));
