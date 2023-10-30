// src/components/Footer.js

import React from "react";
import { NavLink } from "react-router-dom";

function Footer() {
    return (
        <div className="container">
            <footer className="py-3 mt-4 ">
                <ul className="nav justify-content-center">
                    <NavLink to="/" className="nav-link px-2 text-muted">
                        Home
                    </NavLink>
                    <NavLink to="/about" className="nav-link px-2 text-muted">
                        About
                    </NavLink>
                </ul>
                <p className="text-center text-muted mt-3">© 2023 SmartTasker</p>
            </footer>
        </div>
    );
};

export default Footer;