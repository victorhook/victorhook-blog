import React from 'react'
import Utils from '../utils';

import PostCard from './PostCard';


const Homepage = () => {

    const [latestPost, setLatestPost] = React.useState(null);

    const getLatestPost = () => {
        fetch('/api/post')
            .then(res => res.json())
            .then(posts => {
                if (posts.length > 0) {
                    let post = posts.slice(-1)[0];
                    post.tags = [];
                    setLatestPost(post);
                    getTagsOfPost(post);
                } else {
                    setLatestPost(null);
                } 
            })
    }

    const getTagsOfPost = post => {
        fetch('/api/tag')
            .then(res => res.json())
            .then(tags => {
                let thisPostsTags = tags.filter(tag => tag.post == post.id);
                let postCopy = Object.assign({}, post);
                postCopy.tags = thisPostsTags;
                setLatestPost(postCopy);
        })
    }

    React.useEffect(() => getLatestPost(), []);

    return (
        <div className="homepage container-fluid">

            <div className="row">
                <h3 className="home-title">Some thoughts from Victor Krook</h3>
            </div>

            <div className="profile-pic">
                <img src="/media/profile.jpg"></img>
            </div>
        
            {
                latestPost === null
                ? <div className="d-flex justify-content-center">
                    <p>No previous blog posts</p>                
                </div>
                

                : 
                <div class="row">
                    <div class="offset-0 col-12 offset-sm-1 col-sm-10 offset-lg-2 col-lg-8 offset-xl-3 col-xl-6">
                        <h3 className="last-post-title">Last post</h3>
                        <PostCard post={latestPost} />
                    </div>
                </div>
            }

        </div>
    )
}

export default Homepage
