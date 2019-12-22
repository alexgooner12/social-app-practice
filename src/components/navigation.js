import React from 'react';
import { Link } from 'react-router-dom';

export default function Navigation() {
    return (
        <nav className="navbar navbar-expand-md navbar-dark bg-dark navbar-expand-lg">
            <div className="container">
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <Link to='/' className="navbar-brand">Social app</Link>
                <div className="collapase navbar-collapse" id="navbarTogglerDemo01">
                    <ul className="navbar-nav ml-auto">
                        <li className="navbar-item">
                            <Link to="/" className="nav-link">Users</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}