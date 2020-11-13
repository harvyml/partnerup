import React, {useState, useEffect} from "react"
import {Col, Row} from "react-bootstrap"
import {Nav} from "./components/Nav"
import {Info} from "./components/Info"

const App = () => {
    return (
        <div className="app-body">
            <Nav/>
            <Info/>
        </div>
    )
}


export default App