import React from 'react'

const PostCard = ({ post }) => {
    const date = post.timestamp.split('T')[0];

    return (
        <div className="card post" key={post}>
            <h3 className="card-title">{ post.title }</h3>
            <p className="card-body">{ post.body }</p>
            <span className="post-date">Posted: { date }</span>
        </div>
    )
}

export default PostCard
