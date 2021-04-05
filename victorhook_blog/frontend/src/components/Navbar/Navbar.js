import React from 'react'
import { Link } from "react-router-dom";


const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-sm navbar-light bg-light">
            <div className="container-fluid">
            <Link className="navbar-brand" to="/">HOME</Link>

            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContent" aria-controls="navbarContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse justify-content-end" id="navbarContent">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <Link className="nav-link" to="/archive">archive</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/about">about</Link>
                    </li>
                </ul>
            </div>
            </div>
        </nav>
    )
}

export default Navbar
