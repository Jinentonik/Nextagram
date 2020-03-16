import React from 'react'
import SignUp from './signup'
import SignIn from './signin'

const Form = (props) => {
    const {modal, setModal, signUp, setSignUp} = props //get this modal input from navbar and update setModal value
    
    return (
        <div style = {{
                        width: "100vw", 
                        height: "100vh",
                        position: "fixed",
                        display:modal? "flex" : "none",
                        justifyContent:"center",
                        alignItems:"center",
                        top: "0",
                        left:"0",
                        backgroundColor:"rgba(0,0,0,0.8)",
                        zIndex:"10"
                        }}>
            
            {
                signUp?<SignUp setModal = {setModal} setSignUp = {setSignUp}></SignUp>:
                <SignIn setModal = {setModal} setSignUp = {setSignUp}></SignIn>
            }   
        </div>
    )
}

export default Form