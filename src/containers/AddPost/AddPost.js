import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import './AddPost.css';
import * as actionTypes from '../../store/actions/actionTypes';

const mapDispatchToProps = (dispatch, ownProps) => {
  switch (ownProps.title) {
    case "Notice": 
      return {
        onStorePost: (title, content) => dispatch({ type: actionTypes.ADD_POST_NOTICE, title: title, content: content})
      };
      
    case "Free": 
      return {
        onStorePost: (title, content) => dispatch({ type: actionTypes.ADD_POST_FREE, title: title, content: content})
      };
            
    default: 
        break;
  }
};

class AddPost extends Component {
    state = {
        title: '',
        content: '',
        submitted: false,
    }

    postItemHandler = () => {
        this.props.onStorePost(this.state.title, this.state.content);
        alert('Submitted!');
        this.setState({submitted: true});
    }

    render() {
        if(this.state.submitted) {
          let pathname = window.location.pathname;
          if (pathname.charAt(pathname.length - 1) === '/') {
            return <Redirect to={pathname.slice(0, -5)} />;
          } else {
            return <Redirect to={pathname.slice(0, -4)} />;
          }
        }
        return (
            <div className='AddPost'>
                <h1>Add a {this.props.title}</h1>
                <label>Title</label>
                <input type='text' value={this.state.title} onChange={(event) => this.setState({title: event.target.value})} />
                <label>Content</label>
                <textarea rows='4' type='text' value={this.state.content} onChange={(event) => this.setState({content: event.target.value})} />
                <button onClick={this.postItemHandler}>Submit</button>
            </div>
        );
    }
}
export default connect(null, mapDispatchToProps)(AddPost);