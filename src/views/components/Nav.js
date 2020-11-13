import React, {useState, useEffect} from "react"
import {Navbar} from "react-bootstrap"

const Nav = props => {
    return (
        <Navbar className="torre-dark" variant="dark">
            <Navbar.Brand href="#home">torre</Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse className="justify-content-end">
                <Navbar.Text className="torre-light">
                Signed in as: <a href="#login">Mark Otto</a>
                </Navbar.Text>
            </Navbar.Collapse>
        </Navbar>
    )
}

export {Nav}