import React from 'react'
import { Link } from 'react-router-dom';


const ArchivePost = ({ post, isAdmin }) => {
    const date = post.timestamp.split('T')[0];

    const className = post.public ? 'post-public' : 'post-not-public';

    return (
        <div className="offset-3 col-6 archive-post" key={post}>
            <Link to={`/post/${post.id}/`}>

                {
                    isAdmin &&
                    <p className={`publicity ${className}`}>
                        {post.public ? 'Public' : 'Not public'}
                    </p>
                }
                <div className="post-header d-flex justify-content-between">
                    <h3 className="post-title">{ post.title }</h3>
                    <h6 className="post-date">Posted: { date }</h6>
                </div>

                <p className="post-body">{ post.body }</p>

            </Link>
        </div>
    )
}

export default ArchivePost
