import React from 'react'
import Utils from '../../utils';

import { Eyeglasses } from 'react-bootstrap-icons';


// This is special for UPLOADING image, since it's not handled by the
// normal REST API backend.
const ENDPOINT_UPLOAD = '/api/upload_image/';
const ENDPOINT_BASE = '/api/image';

const SELECTED_IMAGE_CLASS = 'image-selected';


const Imagepage = () => {

    const imageRef = React.useRef(); 
    const [selectedImage, setSelectedImage] = React.useState(null);
    const [images, setImages] = React.useState([]);

    const modalImage = React.useRef();
    const modalTitle = React.useRef(); 

    /* Callback when pressing upload button. */
    const uploadImage = image => {
        const files = imageRef.current.files;

        if (files.length === 0) {
            console.log('Failed to read any files!')
            return;
        }

        for (let file of files) {

            let form = new FormData();
            form.append(file.name, file);

            fetch(ENDPOINT_UPLOAD, {
                method: 'POST',
                headers: new Headers({'X-CSRFToken': Utils.getCookie('csrftoken')}),
                body: form
            }).then(res => res.json())
              .then(res => {
                  if (res.result != 'ok') {
                      console.log(`Error uploading file: ${res}`);
                      return;
                  }
                  fetchImages();
              })
        }
    } 

    const deleteImage = () => {
        if (selectedImage === null) {
            console.log('No image selected');
            return;
        }

        fetch(`${ENDPOINT_BASE}/${selectedImage.image.id}/`, {
            method: 'DELETE',
            headers: new Headers({'X-CSRFToken': Utils.getCookie('csrftoken')}),
            body: {id: selectedImage.image.id}
        }).then(res => {
            if (res.status === 204) {   // Success
                deselectImage();
                fetchImages();
            } else {
                console.log(`Failed to delete image ${selectedImage.image.id}`);
            }
        })
    }

    /* Fetches all images and sets them as state. */
    const fetchImages = () => {
        fetch(ENDPOINT_BASE)
            .then(res => res.json())
            .then(images => setImages(images));
    }

    React.useEffect(() => {
        fetchImages();
    }, []);

    const deselectImage = () => {
        if (selectedImage != null) {
            selectedImage.target.classList.remove(SELECTED_IMAGE_CLASS);
            setSelectedImage(null);
        }
    }

    const selectImage = (target, image) => {
        deselectImage();

        target.classList.add(SELECTED_IMAGE_CLASS);
        setSelectedImage({
            target: target,
            image: image
        });
    }

    return (
        <div className="imagepage container-fluid">

            <div className="row">
                <h3 className="justify-content-center d-flex page-title">Images</h3>
            </div>


            <div className="tools d-flex">
                <input className="tool file-selector" type="file" accept="image/*" ref={imageRef}/>
                <button className="tool button" onClick={uploadImage}>Upload</button>
                <button className="tool button" onClick={deleteImage}>Delete image</button>
            </div>


            <div className="image-container d-flex">
                {images.map(image => 
                    <div className="image-outer">
                        
                        <div className="glasses-container">
                            <Eyeglasses className="glasses"/>
                        </div>

                        <img src={image.image} 
                            alt={image.name} 
                            data-id={image.id}
                            onClick={e => selectImage(e.target, image)}
                        />
                    </div>
                )}
            </div>

            <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#imageModal">
            Launch demo modal
            </button>

            <div class="modal fade" id="imageModal" tabindex="-1" aria-labelledby="imageModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" ref={modalTitle} id="imageModalLabel">Image</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <img ref={modalImage} class="img-fluid"></img>
                </div>
                </div>
            </div>
            </div>


        </div>
    )
}

export default Imagepage
