import React from 'react'

import Toggler from '../Toggler';
import Utils from '../../utils';

const ENDPOINT = '/api/post/';


const NewPost = () => {
    
    const [newIsPublic, setIsPublic] = React.useState(false);

    const newTitle = React.useRef();
    const newBody = React.useRef();


    const create = e => {

        if (newTitle.current.value === "" ||
            newBody.current.value === "") {
                console.log('Empty fields!');
                return;
            }

        fetch(ENDPOINT, {
            method: 'POST',
            headers: new Headers({
                'X-CSRFToken': Utils.getCookie('csrftoken'),
                'Content-type': 'application/json'
            }),
            body: JSON.stringify({
                title: newTitle.current.value,
                body: newBody.current.value,
                public: newIsPublic
            })
        }).then(res => res.json())
          .then(res => {
              if (res.id != undefined) {
                    window.location.href = `/post/${res.id}`
              } else {
                    console.log('Failed to create post!');
              }
          })
        e.preventDefault();
    }

    return (
        <div className="row">
            <div className="new-post offset-2 col-8">

                <label className="post-label" htmlFor="title">Title</label>
                <input type="text" id="title" ref={newTitle}></input>

                <Toggler textToggled="Public" 
                        textNotToggled="Not public"
                        onClick={checked => setIsPublic(checked)}
                />

                <label className="post-label" htmlFor="body">Body</label>
                <textarea id="body" rows="20" ref={newBody}></textarea>


                <div className="button-container">
                    <button className="button" onClick={create}>
                        Create
                    </button>
                </div>
            </div>
        </div>


    )   
}

export default NewPost
