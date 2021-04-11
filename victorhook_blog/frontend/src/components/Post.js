import React from 'react'
import { useParams } from 'react-router-dom';

import MinutesRead from './MinutesRead';


/* This component will be visible for the public and displays a post. */
const Post = () => {

    const params = useParams();
    const id = params.id;
    const title = React.useRef();
    const date = React.useRef();
    const body = React.useRef();
    const taglist = React.useRef();

    const ENDPOINT = '/api/post';

    const getPost = () => {
        fetch(`${ENDPOINT}/${id}`)
            .then(res => res.json())
            .then(post => {
                if (post.title === undefined ||
                    post.timestamp === undefined ||
                    post.body === undefined ||
                    post.public === undefined)
                {
                    console.log(`Failed to read post ${id}, got: ${post}`);
                    return;
                }

                title.current.innerHTML = post.title;
                body.current.innerHTML = post.body;
                date.current.innerHTML = post.timestamp.split('T')[0];

                applyTagsOfPost({id: id});
            });
    };

    const applyTagsOfPost = post => {
        fetch('/api/tag')
            .then(res => res.json())
            .then(tags => {
                tags = tags.filter(tag => tag.post == post.id)
                
                for (let tag of tags) {
                    let newTag = document.createElement('li');
                    newTag.innerHTML = tag.name;
                    taglist.current.appendChild(newTag);
                }
        })
    }

    React.useEffect(() => {
        getPost();
    }, []);


    return (
        <div className="blogpost container-fluid">

            <div className="row">
                <div className="offset-0 col-12 offset-sm-1 col-sm-10 offset-xl-3 col-xl-6">

                    <h3 className="blogpost-title"
                        ref={title}>
                    </h3>


                    <div className="row">
                        <h6 className="col-4 col-sm-3 bold">
                            Posted:
                        </h6>

                        <span className="col-8 col-sm-9 blogpost-date" ref={date}>
                            
                        </span>
                    </div>

                    <div className="row">
                        <h6 className="col-4 col-sm-3 bold">
                        Categories:
                        </h6>

                        <ul className="blogpost-tag-list col-8 col-sm-9" ref={taglist}>
                        </ul>
                    </div>

                    <hr />

                    <div className="blogpost-body readable"
                         ref={body}>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Post
