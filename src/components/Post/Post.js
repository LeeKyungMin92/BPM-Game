import React from 'react';
import './Post.css';

const Post = (props) => {
    return (
        <div className='Post'>
            <div className='name' onClick={props.clickDetail}>
                {props.title}
            </div>
            <button onClick={props.clickDelete}>Delete</button>
        </div>
    );
}
export default Post;