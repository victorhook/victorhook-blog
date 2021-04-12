import React from 'react'

const ImageContainer = ({ images, toggleAlert, className }) => {

    const getTag = image => `![${image.image}](${image.name})`;

    const copyImageTag = image => {
        const tag = getTag(image);
        navigator.clipboard.writeText(tag).then(err => {
            if (err) {
                console.log('Failed to copy to clipboard!');
            } else  {
                toggleAlert('Image tag copied!');
            }
        })
    }

    className = `${className} image-container`;

    return (
        <div className={className}>
            <div className="dropdown">
                <a className="button dropdown-toggle" role="button" id="postImageMenu" data-bs-toggle="dropdown" aria-expanded="false">
                Images
                </a>

                <ul className="dropdown-menu" id="image-dropdown" aria-labelledby="postImageMenu">

                    <div className="dropdown-item image-wrapper d-flex flex-wrap">
                        {
                            images.map(image => 
                                    <li key={image.id} data-bs-toggle="tooltip" data-bs-placement="top" title="Copy tag"
                                        onClick={() => copyImageTag(image)}
                                    >
                                        <div className="d-flex flex-column">
                                            <p>{image.name}</p>
                                            <img src={image.image} alt={image.name} draggable="true"></img>
                                        </div>
                                    </li>
                                )
                        }
                    </div>

                </ul>
            </div>

        </div>
    )
}

export default ImageContainer
