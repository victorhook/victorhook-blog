import React from 'react'

const Tag = ({ tag }) => {
    return (
        <div className="tag">
            <h6>{ tag.name }</h6>
        </div>
    )
}

export default Tag
