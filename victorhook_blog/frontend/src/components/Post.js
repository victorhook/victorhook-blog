import React from 'react'
import { useParams } from 'react-router-dom';

import Toggler from './Toggler';
import Utils from '../utils';
import Tags from './Adminpage/Tags';


function baseQuery(endpoint, method, body, callback) {
    fetch(endpoint, {
        method: method,
            headers: new Headers({
                'X-CSRFToken': Utils.getCookie('csrftoken'),
                'Content-type': 'application/json'
            }),
            body: JSON.stringify(body)
    }).then(res => res.status != 204 ? res.json() : res.status)
      .catch(err => console.log(`ERROR: ${err}`))
      .then(res => {
            if (callback != undefined)
                callback(res);
            else
                console.log(res);
      })
}


const Post = ({ edit }) => {

    const [isPublic, setIsPublic] = React.useState(false);
    const [alert, setAlert] = React.useState(false);
    const [alertMsg, setAlertMsg] = React.useState('Alert');

    const params = useParams();
    const id = params.id;
    const title = React.useRef();
    const date = React.useRef();
    const body = React.useRef();

    const ENDPOINT = edit ? '/api/post_all' : '/api/post';

    const getPost = () => {
        fetch(`${ENDPOINT}/${id}`)
            .then(res => res.json())
            .then(post => {
                if (post.title === undefined ||
                    post.timestamp === undefined ||
                    post.body === undefined ||
                    post.public === undefined)
                {
                    console.log(`Failed to read post ${id}, got: ${post}`);
                    return;
                }

                title.current.innerHTML = post.title;
                body.current.innerHTML = post.body;
                date.current.innerHTML = post.timestamp.split('T')[0];

                setIsPublic(post.public);
            });
    };

    const savePost = (isPublicParam) => {
        baseQuery(`${ENDPOINT}/${id}/`, 'PUT', {
            title: title.current.innerHTML,
            body: body.current.innerHTML,
            date: date.current.innerHTML,
            public: isPublicParam != undefined ? isPublicParam : isPublic
        }, res => {
            if (res.id != undefined) {
                toggleAlert('Saved');
            } else {
                toggleAlert('Failed to save!');
                console.log(`Failed to save post ${id}`);
            }
        });
        
    }

    const deletePost = () => {
        baseQuery(`${ENDPOINT}/${id}/`, 'DELETE', {}, res => {
            if (res == 204) {
                window.location.href = '/archive';
            } else {
                toggleAlert('Failed to delete post!');
            }
        });
    };

    const toggleAlert = msg => {
        setAlert(true);
        if (msg)
            setAlertMsg(msg);
    }

    const setPublic = isPublic => {
        setIsPublic(isPublic);
        savePost(isPublic);
    }

    React.useEffect(() => {
        if (alert) {
            setInterval(() => setAlert(false), 3000);
        }
    }, [alert]);

    React.useEffect(() => {
        if (id === undefined) {
            console.log(`Failed to read post id: ${params}`);
            return;
        }

        getPost();
    });

    /* Add ctrl-S save */
    document.addEventListener('keydown', e => {
        if (e.key == "s" && e.ctrlKey) {
            savePost();
            e.preventDefault();
        }
    })


    return (
        <div className="blogpost container-fluid">

            {
                alert &&
                <div className="alert alert-primary" role="alert">
                    {alertMsg}
                </div>
            }

            {
                edit && 
                <div className="tools d-flex justify-content-start">
                    <Toggler textToggled="Public"
                             textNotToggled="Not public" 
                             onClick={setPublic}
                             className="tool"
                             isToggled={isPublic}
                    />

                    <button className="button tool"
                            onClick={deletePost}>Delete</button>

                    <button className="button tool"
                            onClick={() => savePost()}>Save</button>

                    <Tags postId={id}
                        toggleAlert={toggleAlert}
                        baseQuery={baseQuery}
                        className="tool"
                        />

                </div>
            }


            <div className="row">
                <div className="offset-2 col-8 post-content">
                    <h3 className="blogpost-title"
                        ref={title}
                        contentEditable={edit ? "true" : "false"}
                        >
                    </h3>

                    <span className="blogpost-date"
                            ref={date}
                            contentEditable={edit ? "true" : "false"}
                            >
                    </span>

                    <p className="blogpost-body readable"
                        ref={body}
                        contentEditable={edit ? "true" : "false"}
                        >
                    </p>
                </div>
            </div>

        </div>
    )
}

export default Post
