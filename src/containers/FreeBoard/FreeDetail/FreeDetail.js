import React, { Component } from 'react';
import './FreeDetail.css';
import { connect } from 'react-redux';
import * as actionTypes from '../../../store/actions/actionTypes';

class FreeDetail extends Component {
  componentDidMount() {
    this.props.onGetFree(this.props.match.params.id);
  }

  render() {
    let id = null; let title = ''; let content = '';
    if (this.props.selectedFree) {
      id = this.props.selectedFree.id;
      title = this.props.selectedFree.title;
      content = this.props.selectedFree.content;
    }
    
    return (
      <div className='FreeDetail'>
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
  selectedFree: state.pt.selectedFree,
});

const mapDispatchToProps = (dispatch) => ({
  onGetFree: (id) => dispatch({ type: actionTypes.GET_POST_FREE, targetID: id }),
});

export default connect(mapStateToProps, mapDispatchToProps)(FreeDetail);
