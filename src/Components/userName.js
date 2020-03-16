import React, {useState, useEffect} from 'react'
import axios from 'axios'

const UserName = (props) => {
    const {userID} = props
    const [userName, setUserName] = useState({})

    useEffect(() => {
        axios.get(`https://insta.nextacademy.com/api/v1/users/${userID}`)
        .then(result => {
            setUserName(result.data)
            // console.log(result.data)
        })
        .catch(error => console.log(`Error: ${error}`))
    },[])

    return(
        <div>
            <h1>{userName.username}</h1>
            <img alt = "profile" style = {{width: "300px", borderRadius:"50%", border: "2px solid white"}} src = {userName.profileImage}></img>
        </div>
    )
}

export default UserName