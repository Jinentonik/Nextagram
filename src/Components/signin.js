import React, {useState} from 'react'
import Axios from 'axios'
import { toast } from 'react-toastify'
import Loading from './loading'

const SignIn = (props) => {
    const {setModal, setSignUp} = props
    const [userName, setUserName] = useState('')
    const [passWord, setPassWord] = useState('')
    const [loading, setLoading] =useState(false)


    const signUpBtn = () => {
        setSignUp(true)
    }
    
    const closeBtn = (e) => {
        e.preventDefault()
        setModal(false)
    }

    
    const submitFunc = (e) => {
        e.preventDefault()
        // console.log(`Username: ${userName}`)
        // console.log(`Password: ${passWord}`)
        setLoading(true)
        Axios({
            url:"https://insta.nextacademy.com/api/v1/login",
            method:"POST",
            headers:{
                "Content-Type": "application/json"
            },
            data:{
                "username":userName,
                "password":passWord
            }
        })
        .then(result => {
            // console.log(result)
            localStorage.setItem("token", result.data.auth_token)
            toast.info(`Welcome back ${result.data.user.username}! We miss you.`)
            setModal(false)
        })
        .catch(err => {
            console.log(`Error is:${err}`)
            setModal(false)
            toast.warning(`Invalid login!`)
        })

        setUserName('')
        setPassWord('')
    }

    const validateForm = () => {
        // console.log(userName, passWord)
        if(userName !== "" && passWord !== "" ){
            return false
        }else{
            return true
        }
    }

    if(loading){
        return (<Loading width = "100px" height = "100px"></Loading>)
    }else{
        return(
            <div style = {{
                width: "450px", 
                height: "300px", 
                backgroundColor:"white", 
                borderRadius: "20px"
                }}>
                <h1>Sign In</h1>
                <hr></hr>
            <form onSubmit = {submitFunc}>
                <div style = {{display :"flex", justifyContent:"space-between", margin: "3%", fontSize: "24px"}}>
                    <label for = "userName">Username: </label>
                    <input id = "userName" type = "text" placeholder = "Type your username" value = {userName} onInput = {(e) => setUserName(e.target.value)}></input>
                </div>
                <div style = {{display :"flex" , justifyContent:"space-between", margin: "3%", fontSize: "24px"}}> 
                    <label for = "passWord">Password: </label>
                    <input id = "passWord" type = "password" placeholder = "Type your password" value = {passWord} onInput = {(e) => setPassWord(e.target.value)}></input>
                </div>
                <input disabled = {validateForm()} type = "Submit" value = "Sign In" style = {{fontSize: "24px", margin: "10px"}}></input>
                <button onClick = {closeBtn} style = {{fontSize: "24px", margin:"10px"}}>Close</button>
            </form>
            <a href = "#" onClick = {signUpBtn}>Do not have an account?</a>
            
    
    
            </div>
        )
    }    
}
export default SignIn