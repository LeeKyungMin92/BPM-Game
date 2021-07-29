import React from 'react';
import './Post.css';

const Post = (props) => {
    return (
        <div className='Post'>
            <div className='text' onClick={props.clickDetail}>
                {props.title}
            </div>
            <button className='btn' onClick={props.clickDelete}>Delete</button>
        </div>
    );
}
export default Post;