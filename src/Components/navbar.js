import React, {useState} from 'react';
import { Link, useHistory } from "react-router-dom";
import './navbar.css';
import Form from './form'
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/Navbar'
import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.min.css';

const Nav = () => {
    const [modal, setModal] = useState(false)
    const [signUp, setSignUp] = useState(true)
    const token = localStorage.getItem("token")
    const history = useHistory();

    const clickSignIn = () => {
        setModal(true);
        setSignUp(false)
    }

    const clickSignUp = () => {
        setModal(true);
        setSignUp(true)
    }

    const signOutBtn = () => {
        localStorage.removeItem("token")
        history.push("/");
    }
    console.log(token)
    return(
        // <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        // <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
        // <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        // <Navbar.Collapse id="responsive-navbar-nav">
        // <Nav className="mr-auto">
        //     <Nav.Link href="#features">Features</Nav.Link>
        //     <Nav.Link href="#pricing">Pricing</Nav.Link>
        //     <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
        //         <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
        //         <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
        //         <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
        //         <NavDropdown.Divider />
        //         <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
        //     </NavDropdown>
        // </Nav>
        // <Nav>
        //     <Nav.Link href="#deets">More deets</Nav.Link>
        //     <Nav.Link eventKey={2} href="#memes">
        //         Dank memes
        //     </Nav.Link>
        // </Nav>
        // </Navbar.Collapse>
        // </Navbar>


        <div style = {{
            backgroundColor: "lightskyblue", 
            display: "flex",
            justifyContent: "space-between"}}>
            <div>
                <Link  id = "link" to = "/" exact>
                    <h1 >Jintagram</h1>
                </Link>
            </div>
            <div style = {{width: "50%", display: "flex", justifyContent: "space-evenly", alignItems: "center"}}>
                <div>
                    <input type = "text" placeholder = "Search something" style = {{borderRadius:"10px"}}></input>
                    <input type = "submit" value = "Search" style = {{backgroundColor:"black", color:"white", borderRadius:"10px", border:"none"}}></input>
                </div>
                {
                    token === null?
                    <div></div>:
                    <div>
                        <Link to = "/profile" style = {{color:"black"}}>My Page</Link>
                    </div>

                }
                {
                    token === null?
                    <div>
                        <a onClick = {clickSignIn} href = "#" style = {{color:"black"}}>Sign In</a>
                        <a onClick = {clickSignUp} href = "#" style = {{color:"black"}}>Sign Up</a>
                    </div>:
                    <div><a href = "#" onClick = {signOutBtn} style = {{color:"black"}}>Sign Out</a></div>
                    
                }
                <Form modal = {modal} setModal ={setModal} signUp = {signUp} setSignUp = {setSignUp}></Form>
                
            </div>
        </div>
    )
// Route shows what components to show, where to show the component and when to show component
// Link is suppose to trigger a path change
}

export default Nav