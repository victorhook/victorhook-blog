import React from 'react'
import Utils from '../../utils';


const Tags = ({ postId, toggleAlert, className }) => {

    const [allTags, setTags] = React.useState([]);
    const [postTags, setPostTags] = React.useState([]);

    const ENDPOINT_TAG = '/api/tag/';
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

       Utils.baseQuery(ENDPOINT_TAG, 'POST', body, res => {
           if (res.id != undefined) {
                toggleAlert(`Created tag ${newTagName}`);
                tagInput.current.value = '';
                getTags();
           } else {
                toggleAlert(`Failed to create tag ${newTagName}`, false);
           }
       })
    }

    const addExistingTag = tag => {
        const body = {
            name: tag.name,
            post: postId
        }

        Utils.baseQuery(`${ENDPOINT_TAG}`, 'POST', body, res => {
            if (res == Utils.CREATED() || !isNaN(res.id)) {
                toggleAlert(`Added tag ${tag.name}`);
                getTags();
            } else {
                toggleAlert(`Failed to create tag ${tag.name}`, false);
            }
        })
    }
    
    const removeTag = tag => {
        Utils.baseQuery(`${ENDPOINT_TAG}${tag.id}`, 'DELETE', {}, res => {
            if (res == Utils.NO_CONTENT()) {
                toggleAlert(`Tag ${tag.name} removed`);
                getTags();
            } else {
                toggleAlert(`Failed to create tag ${tag.name} removed`);
                console.log(`Failed to delete tag! ${res}`);
            }
        })
    }

    React.useEffect(() => getTags(), []);


    return (
        <ul> 

            <li>
                <input type="text" placeholder="tagname" 
                        ref={tagInput}/>
            </li>

            <li>
                <button className="button"
                        onClick={addTag}>
                    Create new tag
                </button>
            </li>

            <li>
                <div className="dropdown">
                    <a className="btn btn-secondary dropdown-toggle" href="#" role="button" id="postTagsMenu" data-bs-toggle="dropdown" aria-expanded="false">
                    All tags
                    </a>

                    <ul className="dropdown-menu" aria-labelledby="postTagsMenu">
                        {allTags.map(tag => 
                            <li key={tag.id}><a className="dropdown-item" href="#" data-bs-toggle="tooltip" data-bs-placement="top" title="Add tag"
                                onClick={() => addExistingTag(tag)}
                            >
                                {tag.name}</a></li>    
                        )}
                    </ul>
                </div>
            </li>


            <li>
                <div className="dropdown">
                    <a className="btn btn-secondary dropdown-toggle" href="#" role="button" id="postTagsMenu" data-bs-toggle="dropdown" aria-expanded="false">
                        Post tags
                    </a>

                    <ul className="dropdown-menu" aria-labelledby="postTagsMenu">
                        {postTags.map(tag => 
                            <li key={tag.id}><a className="dropdown-item" href="#" data-bs-toggle="tooltip" data-bs-placement="top" title="Delete tag"
                                onClick={() => removeTag(tag)}>{tag.name}</a></li>    
                        )}
                    </ul>
                </div>
            </li>


        </ul>
    )
}

export default Tags
