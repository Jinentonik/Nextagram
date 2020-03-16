import React, {useState} from 'react'
import Axios from 'axios'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loading from './loading'


const SignUp = (props) => {
    const {setModal,setSignUp} = props
    const [userName, setUserName] = useState('')
    const [email, setEmail] = useState('')
    const [passWord, setPassWord] = useState('')
    const [confirmPW, setconfirmPW] = useState('')
    const [loading, setLoading]= useState(false)
    const [delay, setDelay] = useState(null)
    const [userNameValid, setUserNameValid] = useState(true)
    const [userNameLoading, setUserNameLoading] = useState(false)
    const [userNameEmpty, setUserNameEmpty] = useState(true)


    const signInBtn = () => {
        setSignUp(false)
    }

    const closeBtn = (e) => {
        e.preventDefault()
        setUserName('')
        setPassWord('')
        setconfirmPW('')
        setEmail('')
        setModal(false)
    }
    
    //check username everytime input has changed
    const userNameCheck = (e) => {
        let inputUserName = e.target.value.trim()
        setUserName(inputUserName)

        if(inputUserName === ""){
            setUserNameLoading(false)
            setUserNameEmpty(true)
        }else if(inputUserName.length > 21 || inputUserName.length < 5){
            setUserNameValid(false)
            setUserNameLoading(false)
            setUserNameEmpty(false)
        }else{
            setUserNameLoading(true)
            setUserNameEmpty(false)
        
        

            clearTimeout(delay)
            const newDelay = setTimeout(() => {

                Axios({
                    url:`https://insta.nextacademy.com/api/v1/users/check_name?username=${inputUserName}`
                })
                .then(res => {
                    console.log(res.data)
                    if(res.data.valid){
                        setUserNameValid(true)
                        setUserNameLoading(false)
                        // toast.success(`This username is valid`,{position:"top-center"})
                    }else{
                        setUserNameValid(false)
                        setUserNameLoading(false)
                        // toast.error(`This username is invalid, choose another username`,{position:"top-center"})
                    }
                })
                .catch(err => console.log(`Error: ${err}`))

                }, 300)
            
            setDelay(newDelay)

        }
        
    }

    const validateForm = () => {
        // console.log(userName, passWord, confirmPW)
        if(userName !== "" && passWord !== "" && confirmPW !== "" && email !== ""){
            return false
        }else{
            return true
        }
    }
    
    const submitFunc = () => {
        // e.preventDefault()
        setLoading(true)
        Axios(
            {
                url: "https://insta.nextacademy.com/api/v1/users/",
                method: "post",
                headers: {
                    "Content-Type": "application/json"
                },
                data:{
                    "username": userName,
                    "password": passWord,
                    "email": email
                }
            }
        )
        .then(result => {
            console.log(result)
            
            toast.success('Sign up successful',{position:"top-right"})
            setModal(false)

        })

         
        .catch(error => console.log(error.response))

        console.log(`Username: ${userName}`)
        console.log(`Password: ${passWord}`)
        console.log(`Confirm PW: ${confirmPW}`)
        console.log(`email: ${email}`)
        setUserName('')
        setPassWord('')
        setconfirmPW('')
        setEmail('')
        if(passWord === confirmPW){
            console.log(`Password matched`)
        }else{
            console.log(`Password does not match`)
        }
        

    }

    if(loading){
        return(
            <Loading width = "100px" height = "100px"></Loading>
        )
    }else{
        return(
            <div style = {{
                width: "650px", 
                height: "500px", 
                backgroundColor:"white", 
                borderRadius: "20px"
                }}>
    
                <h1>Sign Up</h1>
                <hr></hr>
    
            <form onSubmit = {submitFunc}>
                    <div style = {{display :"flex", justifyContent:"space-between", margin: "3%", fontSize: "24px"}}>
                        <label for = "userName">Username: </label>
                        <div>
                        <input minLength = "5" maxLength = "20" style = {{display:"block"}}id = "userName" type = "text" placeholder = "Type your username" value = {userName} onInput = {userNameCheck}></input>
                        {   //if username is empty, show nothing, else show loading bar before receiving result data
                            userNameEmpty?<div></div>:
                            (userNameLoading?<Loading width = "18px" height = "18px"></Loading>:
                            <div>
                                <span style = {{color: "green", fontSize:"12px", textAlign:"left", display: userNameValid?"block":"none"}}>The username is valid.</span>
                                <span style = {{color: "red", fontSize:"12px", textAlign:"left", display: userNameValid?"none":"block"}}>The username is invalid</span>
                            </div>)
                        }
                        </div>
                        
                    </div>
                    
                    
                    <div style = {{display :"flex", justifyContent:"space-between", margin: "3%", fontSize: "24px"}}>
                        <label for = "email">Email: </label>
                        <input id = "email" type = "email" placeholder = "Type your email here" value = {email} onInput = {(e)=>setEmail(e.target.value)}></input>
                    </div>
                    <div style = {{display :"flex" , justifyContent:"space-between", margin: "3%", fontSize: "24px"}}> 
                        <label for = "passWord">Password: </label>
                        <input minLength = "8" maxLength = "50" id = "passWord" type = "password" placeholder = "Type your password" value = {passWord} onInput = {(e)=>setPassWord(e.target.value)}></input>
                    </div>
                    <div style = {{display :"flex", justifyContent:"space-between", margin: "3%", fontSize: "24px"}}>
                        <label for = "confirmPW">Confirm Password: </label>
                        <input id = "confirmPW" type = "password" placeholder = "Confirm your passwod" value = {confirmPW} onInput = {(e)=>setconfirmPW(e.target.value)}></input>
                    </div>
                    
                <input style = {{fontSize: "24px", margin: "10px"}} disabled = {validateForm()} type = "submit"></input>
                <button onClick = {closeBtn} style = {{fontSize: "24px", margin: "10px"}}>Close</button>
            </form>
            <a href = "#" onClick = {signInBtn}>already sign up?</a>
    
            
    
            </div>
        )
    }
}

export default SignUp