import React, {useState, useEffect} from "react"
import {Card, Button} from "react-bootstrap"

const PersonCard = props => {
    const {name, username, average, picture} = props
    return (
        <Card style={{ width: '18rem', margin: "auto" }}>
            <Card.Img variant="top" src={picture} />
            <Card.Body>
                <Card.Title>{name}</Card.Title>
                <Card.Text>
                    El match de tu busqueda fue de {average.toFixed(2)}
                </Card.Text>
                <Button className="yellow-bg" variant="dark" href={`https://bio.torre.co/en/${username}`}>See Genome</Button>
            </Card.Body>
        </Card>
    )
}

export {PersonCard}