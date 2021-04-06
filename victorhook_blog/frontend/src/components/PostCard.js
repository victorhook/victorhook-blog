import React from 'react'
import { Link } from 'react-router-dom';


const MAX_CHARS = 300;


const PostCard = ({ post, isAdmin }) => {
    const date = post.timestamp.split('T')[0];
    let body = post.body.slice(0, MAX_CHARS);

    const className = post.public ? 'post-public' : 'post-not-public';

    if (post.body.length > MAX_CHARS)
        body += ' ...';

    return (
        <div className="post-card w-50 m-auto" key={post}>
            <Link to={`/post/${post.id}/`}>

                {
                    isAdmin &&
                    <p className={`publicity ${className}`}>
                        {post.public ? 'Public' : 'Not public'}
                    </p>
                }

                <div className="post-top d-flex justify-content-between">
                    <h3 className="post-title">{ post.title }</h3>
                    <h6 className="post-date">Posted: { date }</h6>
                </div>

                <p className="post-body">{ body }</p>
            </Link>
        </div>
    )
}

export default PostCard
