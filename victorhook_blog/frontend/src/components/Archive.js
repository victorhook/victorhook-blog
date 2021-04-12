import React from 'react'

import PostCard from './PostCard';


const Archive = ({ isAdmin }) => {

    const [posts, setPosts] = React.useState([]);
    const endpoint = isAdmin ? '/api/post_all/' : '/api/post/';

    const getPosts = () => {
        fetch(endpoint)
            .then(res => res.json())
            .then(posts => {
                applyTags(posts);
            });
    }

    const applyTags = posts => {
        fetch('/api/tag')
            .then(res => res.json())
            .then(tags => {
                for (let post of posts) {
                    let postTags = tags.filter(tag => tag.post == post.id);
                    post.tags = postTags;
                }
                setPosts(posts);
        })
    }

    React.useEffect(() => getPosts(), []);

    return (
        <div className="archive container-fluid">
            
            <div className="d-flex justify-content-center">
                <h2 className="archive-title">Blog archive</h2> 
            </div>

            {posts.map(post => 
                <div className="row">
                    <div className="offset-0 col-12 offset-sm-1 col-sm-10 offset-lg-2 col-lg-8 offset-xl-3 col-xl-6 pt-4">                        
                        <PostCard post={post}
                                  isAdmin={isAdmin}
                        />
                    </div>
                </div>
            )}
        </div>
    )
}

export default Archive
