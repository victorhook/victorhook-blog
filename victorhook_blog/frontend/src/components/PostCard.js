import React from 'react'
import { Link } from 'react-router-dom';

import Utils from '../utils';
import MinutesRead from './MinutesRead';
import Tag from './Tag';


const MAX_CHARS = 300;


const PostCard = ({ post, isAdmin }) => {
    const date = post.timestamp.split('T')[0];
    let body = post.body.slice(0, MAX_CHARS);
    if (post.body.length > MAX_CHARS)
        body += ' ...';

    const className = post.public ? 'post-public' : 'post-not-public';

    const bodyRef = React.useRef();

    // If we're admin, we want to go to edit post, otherwise just view it.
    const ENDPOINT = isAdmin ? 'post_all_raw' : 'post';

    React.useEffect(() => {
        bodyRef.current.innerHTML = body;
    }, []);

    return (
        <div className="post-card-container">
            <div className="post-card" key={post}>
                <Link to={`/${ENDPOINT}/${post.id}/`}>

                    {
                        isAdmin &&
                        <p className={`publicity ${className}`}>
                            {post.public ? 'Public' : 'Not public'}
                        </p>
                    }

                    <div className="post-top d-flex justify-content-between">
                        <h3 className="post-title">{ post.title }</h3>

                        <div className="post-header">
                            <h6 className="post-date">Posted: { date }</h6>
                            <MinutesRead post={post}/>
                        </div>

                    </div>

                    <ul className="tag-list">
                        {
                            post.tags.map(tag => 
                                <li className="tag-item" key={tag.id}>
                                    <Tag tag={tag}/>
                                </li>
                            )
                        }
                    </ul>

                    <div className="post-body readable"
                         ref={bodyRef}></div>
                </Link>
            </div>
        </div>
    )
}

export default PostCard
