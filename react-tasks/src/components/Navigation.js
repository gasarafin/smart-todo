// src/components/Navigation.js

import React from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

import AuthContext from "../contexts/AuthContext";

function Navigation() {

    const { logout } = useContext(AuthContext);

    return (
        <Navbar expand="md" className="bg-body-tertiary rounded-bottom-4">
            <Container>
                <Navbar.Brand as={Link} to="/">
                    <img
                        alt="Home Screen"
                        src={process.env.PUBLIC_URL + "/smarttasker.svg"}
                        height="30"
                        className="d-inline-block align-top"
                    />{' '}
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/addtask">Add Task</Nav.Link>
                        <Nav.Link as={Link} to="/viewtasks">View Tasks</Nav.Link>
                        <NavDropdown title="Accounts" id="basic-nav-dropdown">
                            <NavDropdown.Item as={Link} to="/login">Log In</NavDropdown.Item>
                            <NavDropdown.Item as={Link} onClick={logout} to="/">Log Out</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item as={Link} to="/signup">Sign Up</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Navigation;