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
        <div>
            
            {
                latestPost === null
                ? <p>No previous blog posts</p>
                : <PostCard post={latestPost} />
            }

        </div>
    )
}

export default Homepage
