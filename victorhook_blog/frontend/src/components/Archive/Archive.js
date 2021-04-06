import React from 'react'

import ArchivePost from './ArchivePost';
import PostCard from '../PostCard';


const Archive = ({ isAdmin }) => {

    const [posts, setPosts] = React.useState([]);
    const endpoint = isAdmin ? '/api/post_all/' : '/api/post/';

    const getPosts = () => {
        fetch(endpoint)
            .then(res => res.json())
            .then(posts => setPosts(posts));
    }

    React.useEffect(() => getPosts(), []);

    return (
        <div className="archive container-fluid">
            <div className="row">
                <ul>
                {posts.map(post => 
                        <li>
                            <PostCard post={post}
                                      isAdmin={isAdmin}
                            />
                        </li>
                )}
                </ul>
            </div>
        </div>
    )
}

export default Archive
