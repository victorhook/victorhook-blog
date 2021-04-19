import React from 'react'
import Utils from '../utils';
import { Book } from 'react-bootstrap-icons';

import MinutesRead from './MinutesRead';

const copyTag = () => {
    const tag = document.createElement('span');
    tag.innerHTML = "COPY";
    return tag;
}

const BlogPost = ({ post }) => {

    const body = React.useRef();

    React.useEffect(() => {
        for (let child of body.current.children) {
            console.log(child);
            child.appendChild(copyTag);
            child.addEventListener('click', () => {
                console.log(child);
                child.scrollIntoView();
            })
        }
    }, [post]);

    return (
        <div className="blogpost-content">
            
            <h3 className="blogpost-title">
                { post.title }
            </h3>

            <ul className="blogpost-info">
                <li>{ post.date }</li>
                <li> <Book /> { Utils.getReadMinutes(post.body.split(' ').length) } min</li>
                {
                    post.tags.map(tag => 
                        <li className="blogpost-tag" key={tag.id}>{tag.name}</li>
                    )
                }
            </ul>

            <hr />

            <div className="blogpost-body readable" ref={body}
            dangerouslySetInnerHTML={{
                __html: post.body
            }}>
            </div>
        </div>

    )
}

export default BlogPost
