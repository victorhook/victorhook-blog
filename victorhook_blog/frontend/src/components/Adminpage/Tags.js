import React from 'react'

const Tags = ({ postId, toggleAlert, baseQuery, className }) => {

    const [allTags, setTags] = React.useState([]);
    const [postTags, setPostTags] = React.useState([]);

    const ENDPOINT_TAG = '/api/tag/';
    const ENDPOINT_POST_TAG = '/api/posttag/';
    const tagInput = React.useRef();

    const getTags = () => {
        // Get ALL tags
        fetch(ENDPOINT_TAG)
            .then(res => res.json())
            .then(tags => {
                setTags(tags);
                setPostTags(tags.filter(tag => tag.post == postId));
            });
    }

    const addTag = () => {
        const newTagName = tagInput.current.value;

        if (newTagName == "")
            return;

       const body = {name: newTagName, post: postId};

       baseQuery(ENDPOINT_TAG, 'POST', body, res => {
           if (res.id != undefined) {
                toggleAlert(`Created tag ${newTagName}`);
                getTags();
           } else {
                toggleAlert(`Failed to create tag ${newTagName}`);
           }
       })
    }

    React.useEffect(() => getTags(), []);

    let baseClassName = "tag-container d-flex";
    if (className != undefined)
        baseClassName += ` ${className}`;

    return (
        <div className={baseClassName}>

            <input type="text" placeholder="tagname" ref={tagInput}/>
            <button className="button"
                    onClick={addTag}>
                Create new tag
            </button>

            <div className="dropdown">
                <a className="btn btn-secondary dropdown-toggle" href="#" role="button" id="postTagsMenu" data-bs-toggle="dropdown" aria-expanded="false">
                All tags
                </a>

                <ul className="dropdown-menu" aria-labelledby="postTagsMenu">
                    {allTags.map(tag => 
                        <li key={tag.id}><a className="dropdown-item" href="#" disabled={true}>{tag.name}</a></li>    
                    )}
                </ul>
            </div>

            <div className="dropdown">
                <a className="btn btn-secondary dropdown-toggle" href="#" role="button" id="postTagsMenu" data-bs-toggle="dropdown" aria-expanded="false">
                    Post tags
                </a>

                <ul className="dropdown-menu" aria-labelledby="postTagsMenu">
                    {postTags.map(tag => 
                        <li key={tag.id}><a className="dropdown-item" href="#" disabled={true}>{tag.name}</a></li>    
                    )}
                </ul>
            </div>
            

        </div>
    )
}

export default Tags
