import React from 'react'

const ArchivePost = ({ post }) => {
    const date = post.timestamp.split('T')[0];

    return (
        <div className="card archive-post" key={post}>
            <h3 className="post-title">{ post.title }</h3>
            <p className="post-body">{ post.body }</p>
            <span className="post-date">Posted: { date }</span>
        </div>
    )
}

export default ArchivePost
