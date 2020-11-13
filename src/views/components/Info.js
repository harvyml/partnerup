import React, {useState, useEffect} from "react"
import {Navbar, Row, Col, Container} from "react-bootstrap"

const Info = props => {
    return (
        <>
            <Row className="space-on-top">
                <Col sm={12}>
                    <div className="main-info reduced-container">
                        <div className="title center">
                            <h1 className="light">torre | Partner Up</h1>
                        </div>
                        <div className="description center">
                            <p>
                            Partner Up is a project for the <span className="torre-light">entrepreneurial</span> style of guys who dont have a cofounder to start a project with, 
                            we will match your <span className="torre-light">soft skills</span> along with the idea you have and find you <span className="torre-light">great people</span> that may be interested in working with you.
                            </p>
                        </div>

                    </div>
                </Col>
            </Row>  
        </>
    )
}

export {Info}