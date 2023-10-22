// src/components/Footer.js

import React from "react";
import { NavLink } from "react-router-dom";

export default function Footer() {
    return (
        <footer>


                <NavLink to="/about" className="nav-link">
                    About
                </NavLink>


        </footer>
    );
}