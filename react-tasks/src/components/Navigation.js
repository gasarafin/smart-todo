// src/components/Navigation.js

import React from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

function Navigation() {
    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand href="/">
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
                        <Nav.Link href="/newtask">Add Task</Nav.Link>
                        <Nav.Link href="/viewtasks">View Tasks</Nav.Link>
                        <NavDropdown title="Accounts" id="basic-nav-dropdown">
                            <NavDropdown.Item href="/login">Log In</NavDropdown.Item>
                            <NavDropdown.Item href="/signup">Sign Up</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="/account">Modify Your Account</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Navigation;