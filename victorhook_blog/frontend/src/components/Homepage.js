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
        <div className="d-flex justify-content-center homepage">
            
            <div className="row">
                <h3 className="offset-2 home-title">the blog of Victor Krook</h3>
            </div>

            {
                latestPost === null
                ? <p>No previous blog posts</p>
                : <div className="last-post">
                    <div className="row">
                        <h3 className="offset-3">Last post</h3>
                    </div>

                    <div className="row">
                        <PostCard post={latestPost} />
                    </div>
                 </div>
                
            }

        </div>
    )
}

export default Homepage
