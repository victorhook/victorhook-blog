import React from 'react'
import Utils from '../utils';
import { Book } from 'react-bootstrap-icons';

import MinutesRead from './MinutesRead';


const BlogPost = ({ post }) => {

    return (
        <div className="blogpost-content">
            
            <h3 className="blogpost-title">
                { post.title }
            </h3>

            <ul className="blogpost-info">
                <li>{ post.date }</li>
                <li> <Book /> { Utils.getReadMinutes(post.body.length) } min</li>
                {
                    post.tags.map(tag => 
                        <li className="blogpost-tag" key={tag.id}>{tag.name}</li>
                    )
                }
            </ul>

            <hr />

            <div className="blogpost-body readable">
                { post.body }
            </div>
        </div>

    )
}

export default BlogPost
