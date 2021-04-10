import React from 'react'
import { Book } from 'react-bootstrap-icons';
import Utils from '../utils';


const MinutesRead = ({ post }) => {
    const words = post.body.split(' ').length;

    return (
        <div className="minutes-read d-flex">
            <Book className="book minutes-read"/>
            <h6 className="minutes-read">{Utils.getReadMinutes(words)} minutes read</h6>
        </div>
    )
}

export default MinutesRead
