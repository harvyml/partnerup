import React, {useState, useEffect} from "react"
import {Modal, Button} from "react-bootstrap"
import {PersonCard} from "./PersonCard"
import Preloader from "./Preloader"
import axios from "axios"


function PeopleModal(props) {
    const {people} = props

    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            People to partner up with
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AllPeople people={people} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="dark" onClick={props.nextpage}>Next page</Button>
          <Button variant="dark" onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }

const AllPeople = (props) => {
  const {people} = props
    return (
        <div className="flex">
          {
            people.length > 0 ? people.map((person, i) => (
              <PersonCard {...person} key={i}/>
            )) : <div className="center reduced-container"><Preloader/></div>
          }
        </div>
    )
}
export default PeopleModal