import React from 'react'
import { useParams, Link } from 'react-router-dom';

import BlogPost from './BlogPost';
import Utils from '../utils';


/* This component will be visible for the public and displays a post. */
const Post = ({ isAdmin }) => {

    const [noPost, setNoPost] = React.useState(false);
    const [post, setPost] = React.useState({
        id: -1,
        public: false,
        title: '',
        date: '',
        body: '',
        tags: []
    })

    const params = useParams();
    const id = params.id;

    const ENDPOINT = isAdmin ? '/api/post_all' : '/api/post';

    const getPost = () => {
        fetch(`${ENDPOINT}/${id}`)
            .then(res => res.json())
            .then(post => {
                if (post.title === undefined ||
                    post.timestamp === undefined ||
                    post.body === undefined ||
                    post.public === undefined)
                {
                    console.log(`Failed to read post ${id}, got: ${JSON.stringify(post)}`);
                    setNoPost(true);
                    return;
                }

                post.date = Utils.getDate(post);
                applyTagsOfPost(post);
            });
    };

    const applyTagsOfPost = post => {
        fetch('/api/tag')
            .then(res => res.json())
            .then(tags => {
                post.tags = tags.filter(tag => tag.post == post.id);
                setPost(post);
            })
    }

    React.useEffect(() => {
        getPost();
    }, []);


    return (
        <div className="blogpost container-fluid">

            <div className="row">
                <div className="offset-0 col-12 offset-sm-1 col-sm-10 offset-xl-3 col-xl-6">

                    {
                        noPost 
                        ? 
                        <div className="no-post">
                            <p>
                                This post was not found.
                            </p>

                            <Link to="/archive" className="link">Go to archive</Link>
                        </div>
                        : 
                        <>
                            {
                                isAdmin &&
                                <div className="admin-header d-flex justify-content-between">
                                    {
                                        post.public
                                        ? <p className="post-public">Public</p>
                                        : <p className="post-not-public">Not public</p>
                                    }
                                    <Link to={`/post_all_raw/${post.id}`} 
                                          className="link">
                                        Edit
                                    </Link>
                                </div>
                            }
                            <BlogPost post={post}/>
                        </>
                    }
                    
                </div>
            </div>

        </div>
    )
}

export default Post
