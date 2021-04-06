import React from 'react'
import { Link } from "react-router-dom";


const Navbar = ({ links }) => {
    return (
        <nav className="navbar navbar-expand-sm navbar-light bg-light">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">HOME</Link>

                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContent" aria-controls="navbarContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse justify-content-end" id="navbarContent">
                    <ul className="navbar-nav">
                        {links.map(link => 
                            <li className="nav-item" key={link.path}>
                                <Link className="nav-link" to={link.path}>{link.text}</Link>
                            </li>    
                        )}
                    </ul>
                </div> 
            </div>
        </nav>  
    )
}

export default Navbar
