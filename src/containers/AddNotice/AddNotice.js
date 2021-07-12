import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import './AddNotice.css';
import * as actionTypes from '../../store/actions/actionTypes';

const mapDispatchToProps = dispatch => {
    return {
        onStorePost: (title, content) => dispatch({ type: actionTypes.ADD_POST_NOTICE, title: title, content: content})
    };
};

class AddNotice extends Component {
    state = {
        title: '',
        content: '',
        submitted: false,
    }

    postItemHandler = () => {
        this.props.onStorePost(this.state.title, this.state.content);
        alert('Submitted!');
        this.setState({submitted: true});
        this.props.history.push('/notice');
    }

    render() {
        if(this.state.submitted) {
            return <Redirect to='/notice' />;
        }
        return (
            <div className='AddNotice'>
                <h1>Add a Notice</h1>
                <label>Title</label>
                <input type='text' value={this.state.title} onChange={(event) => this.setState({title: event.target.value})} />
                <label>Content</label>
                <textarea rows='4' type='text' value={this.state.content} onChange={(event) => this.setState({content: event.target.value})} />
                <button onClick={this.postItemHandler}>Submit</button>
            </div>
        );
    }
}
export default connect(null, mapDispatchToProps)(AddNotice);