import React from 'react'

import PostCard from './PostCard';


const Homepage = () => {

    const [latestPost, setLatestPost] = React.useState(null);

    const getLatestPost = () => {
        fetch('/api/post')
            .then(res => res.json())
            .then(posts => {
                if (posts.length > 0) {
                    setLatestPost(posts.slice(-1)[0]);
                } else {
                    setLatestPost(null);
                } 
            })
    }

    React.useEffect(() => getLatestPost(), []);

    return (
        <div className="homepage container-fluid">

            <div className="row">
                <h3 className="home-title">some thoughts from Victor Krook</h3>
            </div>

            <div className="profile-pic">
                <img src="/media/profile.jpg"></img>
            </div>
        
            {
                latestPost === null
                ? <div className="d-flex justify-content-center">
                    <p>No previous blog posts</p>                
                </div>
                

                : <>
                    <div className="row last-post-title">
                        <h3 className="offset-3">Last post</h3>
                    </div>
                    
                    <div class="row">
                        <div class="offset-0 col-12 offset-sm-1 col-sm-10 offset-lg-2 col-lg-8 offset-xl-3 col-xl-6">
                            <PostCard post={latestPost} />
                        </div>
                    </div>
                </>
            }

        </div>
    )
}

export default Homepage
