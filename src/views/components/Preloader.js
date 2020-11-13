import React, {useState, useEffect} from "react"
import {Spinner} from "react-bootstrap"

const Preloader = () => (
    <Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
    </Spinner>
)

export default Preloader