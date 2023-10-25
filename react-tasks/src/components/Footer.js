// src/components/Footer.js

import React from "react";
import { NavLink } from "react-router-dom";

export default function Footer() {
    return (

<>
<div className="container">
  <footer className="py-3 my-4">
    <ul className="nav justify-content-center border-bottom pb-3 mb-3">
    <NavLink to="/" className="nav-link px-2 text-muted">
                    Home
                </NavLink>
      <NavLink to="/about" className="nav-link px-2 text-muted">
                    About
                </NavLink>
      <NavLink to="#" className="nav-link px-2 text-muted">
                    PlaceHolder
                </NavLink>
      <NavLink to="#" className="nav-link px-2 text-muted">
      PlaceHolder
                </NavLink>
      <NavLink to="#" className="nav-link px-2 text-muted">
      PlaceHolder
                </NavLink>
    </ul>
    <p className="text-center text-muted">© 2023 SmartTasker</p>
  </footer>
</div>   







{/*

        <footer className="fixed-bottom">


                <NavLink to="/about" className="nav-link">
                    About
                </NavLink>


        </footer>
    */}

</>  
    );
}