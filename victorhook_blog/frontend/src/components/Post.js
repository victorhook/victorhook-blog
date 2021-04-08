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
                console.log(post.timestamp);
            });
    };

    React.useEffect(() => {
        getPost();
    }, []);


    return (
        <div className="blogpost container-fluid">

            <div className="row">
                <div className="offset-0 col-12 offset-sm-1 col-sm-10 offset-xl-3 col-xl-6">

                    <div className="blogpost-header readable">
                        <h3 className="blogpost-title"
                            ref={title}>
                        </h3>
                        <h6 className="blogpost-date">Posted: <span ref={date}></span></h6>
                    </div>

                    <hr />

                    <div className="blogpost-body"
                         ref={body}>

                    </div>
                </div>
            </div>

        </div>
    )
}

export default Post
