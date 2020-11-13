import React, {useEffect, useState} from "react"
import {Form, Button, Row, Col} from "react-bootstrap"
import PeopleModal from "./PeopleModal"
import axios from "axios"


const SearchPeople = () => {
    const [username, setUsername] = useState("")
    const [people, setPeople] = useState([])
    const [skills, setSkills] = useState({
        best: "",
        secondBest: "",
        thirdBest: "",
        fourthBest: ""   
    })
    const [offset, setOffset] = useState(0)
    const [openTo, setOpenTo] = useState({
        best: "",
        second: ""
    })
    const [showPeopleModal, setShowPeopleModal] = useState(false)
    function UpdateFirstSkill(e){
        setSkills(current => {
            return {
                best: e.target.value,
                secondBest: current.secondBest,
                thirdBest: current.thirdBest,
                fourthBest: current.fourthBest
            }
        })
        console.log(skills)
    }
    function UpdateSecondSkill(e){
        setSkills(current => {
            return {
                best: current.best,
                secondBest: e.target.value,
                thirdBest: current.thirdBest,
                fourthBest: current.fourthBest
            }
        })
        console.log(skills)
    }
    function UpdateThirdSkill(e){
        setSkills(current => {
            return {
                best: current.best,
                secondBest: current.secondBest,
                thirdBest: e.target.value,
                fourthBest: current.fourthBest
            }
        })
        console.log(skills)
    }
    function UpdateFourthSkill(e){
        setSkills(current => {
            return {
                best: current.best,
                secondBest: current.secondBest,
                thirdBest: current.thirdBest,
                fourthBest: e.target.value
            }
        })
        console.log(skills)
    }

    function requestInfo(){
        setPeople([])       
        setShowPeopleModal(true)
        axios.get("/api/users", {
            params:{
              offset,
              size: 5000,
              aggregate: 0,
              array_of_skills: [skills.best, skills.secondBest, skills.thirdBest, skills.fourthBest]
            }
        }).then(snap => {
            setPeople(snap.data)
            setOffset(current => current + 5000) // setting the offset for the nextpage call
        }).catch(err => {
            console.log(err.message)
        })
    }

    function nextpage(){
        requestInfo()
    }

    function updateUsername(e){
        setUsername(e.target.value)
    }
    return (
        <>
        <Row>
            <Col sm={12}>
                <div className="reduced-container">
                    <h3 className="torre-light subtitle center">Search People</h3>
                    <div className="divider"></div>
                    <Form>
                        <Form.Row className="align-items-center">
                        <Col xs="auto" sm={12} md={12}>
                            <h3 className="subtitle">Your Username</h3>
                            <Form.Label htmlFor="inlineFormInputName2" srOnly>
                                Name
                            </Form.Label>
                            <Form.Control
                                className="mb-2 mr-sm-2"
                                id="inlineFormInputName2"
                                placeholder="Jane Doe"
                                onChange={updateUsername}
                            />
                        </Col>
                        <Col xs="auto" sm={6} md={6} className="my-1">
                            <h3 className="subtitle center">You want you partners best skill to be: </h3>
                            <Form.Label className="mr-sm-2" htmlFor="inlineFormCustomSelect" srOnly>
                                Preference
                            </Form.Label>
                            <Form.Control
                                as="select"
                                className="mr-sm-2"
                                id="inlineFormCustomSelect"
                                custom
                                onChange={UpdateFirstSkill}
                            >
                                <SkillOptions/>
                            </Form.Control>
                        </Col>
                        <Col xs="auto" sm={6} md={6} className="my-1">
                            <h3 className="subtitle center">You want you partners second best skill to be: </h3>
                            <Form.Label className="mr-sm-2" htmlFor="inlineFormCustomSelect" srOnly>
                                Preference
                            </Form.Label>
                            <Form.Control
                                as="select"
                                className="mr-sm-2"
                                id="inlineFormCustomSelect"
                                custom
                                onChange={UpdateSecondSkill}
                            >
                                <SkillOptions/>
                            </Form.Control>
                        </Col>
                        <Col xs="auto" sm={6} md={6} className="my-1">
                            <h3 className="subtitle center">You want you partners third best skill to be: </h3>
                            <Form.Label className="mr-sm-2" htmlFor="inlineFormCustomSelect" srOnly>
                                Preference
                            </Form.Label>
                            <Form.Control
                                as="select"
                                className="mr-sm-2"
                                id="inlineFormCustomSelect"
                                custom
                                onChange={UpdateThirdSkill}
                            >
                                <SkillOptions/>
                            </Form.Control>
                        </Col>
                        <Col xs="auto" sm={6} md={6} className="my-1">
                            <h3 className="subtitle center">You want you partners fourth best skill to be: </h3>
                            <Form.Label className="mr-sm-2" htmlFor="inlineFormCustomSelect" srOnly>
                                Preference
                            </Form.Label>
                            <Form.Control
                                as="select"
                                className="mr-sm-2"
                                id="inlineFormCustomSelect"
                                custom
                                onChange={UpdateFourthSkill}
                            >
                                <SkillOptions/>
                            </Form.Control>
                        </Col>
                        
                        {/*
                        <Col xs="auto" sm={6} md={6} className="my-1">
                            <h3 className="subtitle center">You want your partner to be the most open to: </h3>
                            <Form.Label className="mr-sm-2" htmlFor="inlineFormCustomSelect" srOnly>
                                Preference
                            </Form.Label>
                            <Form.Control
                                as="select"
                                className="mr-sm-2"
                                id="inlineFormCustomSelect"
                                custom
                            >
                                <option value="0">Choose...</option>
                                <option value="1">Web Development</option>
                                <option value="2">Enterprenourship</option>
                                <option value="3">Analytic Thinking</option>
                                <option value="4">Adaptability</option>
                            </Form.Control>
                        </Col>
                        <Col xs="auto" sm={6} md={6} className="my-1">
                            <h3 className="subtitle center">You want your partner to be the second most open to: </h3>
                            <Form.Label className="mr-sm-2" htmlFor="inlineFormCustomSelect" srOnly>
                                Preference
                            </Form.Label>
                            <Form.Control
                                as="select"
                                className="mr-sm-2"
                                id="inlineFormCustomSelect"
                                custom
                            >
                                <option value="0">Choose...</option>
                                <option value="1">Web Development</option>
                                <option value="2">Enterprenourship</option>
                                <option value="3">Analytic Thinking</option>
                                <option value="4">Adaptability</option>
                            </Form.Control>
                        </Col>
                        */}
                        </Form.Row>
                        <Button className="torre-light" onClick={requestInfo}>Search People</Button>
                    </Form>
                </div>
            </Col>
        </Row>
        <PeopleModal nextpage={nextpage} people={people} show={showPeopleModal} onHide={() => setShowPeopleModal(false)}/>
        </>
    )
}


const SkillOptions = () => {
    return (
        <>
        <option value="0">Choose...</option>
        <option value="Leadership">Leadership</option>
        <option value="Communication">Communication</option>
        <option value="Creativity">Creativity</option>
        <option value="Strategic Thinking">Strategic Thinking</option>
        <option value="Interpersonal Relationships">Interpersonal Relationships</option>
        <option value="Leadership skills">Leadership skills</option>
        <option value="Multilingual">Multilingual</option>
        <option value="Efficiency">Efficiency</option>
        <option value="Healthcare">Healthcare</option>
        <option value="Technical Support">Technical Support</option>
        <option value="Customer Service">Customer Service</option>
        <option value="Social Media">Social Media</option>
        <option value="Project Management">Project Management</option>
        <option value="Marketing digital">Marketing digital</option>
        <option value="Film Editing">Film Editing</option>
        <option value="Art Direction">Art Direction</option>
        <option value="Graphic Design">Graphic Design</option>
        <option value="Software Development">Software Development</option>
        <option value="Budgeting and Planning">Budgeting and Planning</option>
        <option value="Commercial">Commercial</option>
        </>
    )
    
}
export default SearchPeople;