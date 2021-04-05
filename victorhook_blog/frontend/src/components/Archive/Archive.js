import React from 'react'

import ArchivePost from './ArchivePost';


const Archive = () => {

    const [posts, setPosts] = React.useState([]);

    const getPosts = () => {
        fetch('/api/post')
            .then(res => res.json())
            .then(posts => setPosts(posts));
    }

    React.useEffect(() => getPosts(), []);

    return (
        <div className="archive">
            <ul>
               {posts.map(post => <ArchivePost post={post}/>)}
            </ul>
        </div>
    )
}

export default Archive
