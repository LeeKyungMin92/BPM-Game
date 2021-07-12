import React, { Component } from 'react';
import { connect } from 'react-redux';
import './NoticeDetail.css';
import * as actionTypes from '../../../store/actions/actionTypes';

class NoticeDetail extends Component {
  componentDidMount() {
    this.props.onGetNotice(this.props.match.params.id);
  }

  render() {
    let id = null; let title = ''; let content = '';
    if (this.props.selectedNotice) {
      id = this.props.selectedNotice.id;
      title = this.props.selectedNotice.title;
      content = this.props.selectedNotice.content;
    }

    return (
      <div className='NoticeDetail'>
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
  selectedNotice: state.pt.selectedNotice,
});

const mapDispatchToProps = (dispatch) => ({
  onGetNotice: (id) => dispatch({ type: actionTypes.GET_POST_NOTICE, targetID: id }),
});

export default connect(mapStateToProps, mapDispatchToProps)(NoticeDetail);
