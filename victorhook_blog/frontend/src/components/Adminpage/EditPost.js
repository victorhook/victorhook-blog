import React from 'react'
import { useParams } from 'react-router-dom';

import Toggler from '../Toggler';
import Utils from '../../utils';
import Tags from './Tags';
import ImageContainer from './ImageContainer';


const IMG_ENDPOINT = '/api/image';
const ENDPOINT = '/api/post_all_raw';


const EditPost = () => {
    
    const params = useParams();
    const id = params.id;
    const title = React.useRef();
    const date = React.useRef();
    const body = React.useRef();

    const alertRef = React.useRef();

    // States
    const [saving, setSaving] = React.useState(false);
    const [alert, setAlert] = React.useState(false);
    const [alertInfo, setAlertInfo] = React.useState(true);
    const [alertMsg, setAlertMsg] = React.useState('Alert');
    const [images, setImages] = React.useState([]);
    const [isPublic, setIsPublic] = React.useState(false);


    const getPost = () => {
        fetch(`${ENDPOINT}/${id}`)
            .then(res => res.json())
            .then(post => {
                if (post.title === undefined || post.timestamp === undefined ||
                    post.body === undefined || post.public === undefined)
                {
                    console.log(`Failed to read post ${id}, got: ${post}`);
                    return;
                }

                title.current.value = post.title;
                body.current.value = post.body;
                date.current.value = post.timestamp.split('T')[0];

                setIsPublic(post.public);
            });
    };

    const savePost = (isPublicParam) => {
        Utils.baseQuery(`${ENDPOINT}/${id}/`, 'PUT', {
            title: title.current.value,
            body: body.current.value,
            date: date.current.value,
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
        Utils.baseQuery(`${ENDPOINT}/${id}/`, 'DELETE', {}, res => {
            if (res == 204) {
                window.location.href = '/archive';
            } else {
                toggleAlert('Failed to delete post!');
            }
        });
    };

    const toggleAlert = (msg, info=true) => {
        setAlert(true);
        setAlertInfo(info);
        if (msg)
            setAlertMsg(msg);
    }

    const setPublic = isPublic => {
        setIsPublic(isPublic);
        savePost(isPublic);
    }

    /* Fetches all images and sets them as state. */
    const fetchImages = () => {
        fetch(IMG_ENDPOINT)
            .then(res => res.json())
            .then(images => setImages(images));
    }

    // Fetch initial state elements

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
    }, []);

    React.useEffect(() => {
        fetchImages();
    }, []);

    /* Add ctrl-S save */
    document.addEventListener('keydown', e => {
        if (e.key == "s" && e.ctrlKey) {
            e.preventDefault();

            if (!saving) {
                console.log('SAVING STUFF!');
                setSaving(true);
            }
        }
    })

    /* Add ctrl-S save */
    document.addEventListener('keyup', e => {
        if (e.key == "s" && e.ctrlKey) {
            e.preventDefault();
            setSaving(false);
        }
    })

    React.useEffect(() => {
        if (saving) {
            savePost();
        }
    }, [saving]);

    return (
        <div className="editpost container-fluid">
           
            {
                alert &&
                <div className={alertInfo ? "alert alert-success" : "alert alert-danger"}
                 role="alert" ref={alertRef}>
                    {alertMsg}
                </div>
            }

            <div className="tools">

                <ul>

                    <li>
                        <Toggler textToggled="Public"
                                textNotToggled="Not public" 
                                onClick={setPublic}
                                isToggled={isPublic}
                            />
                    </li>


                    <li>
                        <button className="button"
                            onClick={deletePost}>Delete</button>
                    </li>

                    <li>
                        <button className="button"
                                onClick={() => savePost()}>Save</button>
                    </li>
                    
                    <li>
                        <Tags postId={id}
                            toggleAlert={toggleAlert}
                            />
                    </li>

                    <li>
                        <ImageContainer images={images} 
                                    toggleAlert={toggleAlert}/>
                    </li>

                </ul>


            </div>

            <div className="d-flex w-75 m-auto flex-column edit-post-content">

                <label>Title</label>
                <input type="text" 
                        className="edit-title readable" 
                        ref={title}/>

                <label>Date</label>
                <input type="date"
                        className="edit-date readable"
                        ref={date}/>

                <label>Body</label>
                <textarea rows="30"
                            className="edit-body readable"
                            ref={body}></textarea>

            </div>

        </div>
    )
}

export default EditPost
