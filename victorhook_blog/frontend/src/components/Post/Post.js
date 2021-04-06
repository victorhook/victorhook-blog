import React from 'react'
import { useParams } from 'react-router-dom';


const Post = ({ edit }) => {

    const [postIsPublic, setPostIsPublic] = React.useState(false);

    const params = useParams();
    const title = React.useRef();
    const date = React.useRef();
    const body = React.useRef();
    const publicLabel = React.useRef();

    
    React.useEffect(() => {
        if (params.id === undefined) {
            console.log(`Failed to read post id: ${params}`);
            return;
        }

        fetch(`/api/post/${params.id}`)
            .then(res => res.json())
            .then(post => {
                if (post.title === undefined ||
                    post.timestamp === undefined ||
                    post.body === undefined ||
                    post.public === undefined)
                {
                    console.log(`Failed to read post ${params.id}, got: ${post}`);
                    return;
                }

                title.current.innerHTML = post.title;
                date.current.innerHTML = post.body;
                body.current.innerHTML = post.timestamp.split('T')[0];

                setPostIsPublic(post.public);

                if (edit) {
                    togglePublicity({checked: post.public});
                }
            })
    });


    const togglePublicity = toggle => {
        publicLabel.current.innerHTML = toggle.checked ? 'Public' : 'Not public';
    }

    return (
        <div className="blogpost">

            {
                edit && 
                <div className="form-check form-switch">
                    <input className="form-check-input" type="checkbox" id="public"
                        onInput={e => togglePublicity(e.target)}/>
                    <label className="form-check-label" htmlFor="public"
                        ref={publicLabel}></label>
                </div>
            }


           <h3 className="blogpost-title"
               ref={title}
               contentEditable={edit ? "true" : "false"}
               >
           </h3>
           <span className="blogpost-date"
                 ref={date}
                 contentEditable={edit ? "true" : "false"}>
           </span>
           <p className="blogpost-body"
              ref={body}
              contentEditable={edit ? "true" : "false"}>
           </p>
        </div>
    )
}

export default Post
