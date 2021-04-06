import React from 'react'
import { Link } from 'react-router-dom';


const ArchivePost = ({ post }) => {
    const date = post.timestamp.split('T')[0];

    return (
        <Link to={`/post/${post.id}/`}>
            <div className="card archive-post" key={post}>
                <h3 className="post-title">{ post.title }</h3>
                <p className="post-body">{ post.body }</p>
                <span className="post-date">Posted: { date }</span>
            </div>
        </Link>
    )
}

export default ArchivePost
