import React, {useState, useEffect} from "react"
import {useParams} from "react-router-dom"
import axios from "axios"
import UserName from "../Components/userName"
import Loading from "../Components/loading"
import Image from 'react-graceful-image'

const UserProfilePage = () => {
  const [userImg, setUserImg] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const {id} = useParams()
  useEffect(() => {
    axios.get(`https://insta.nextacademy.com/api/v2/images?userId=${id}`)
    .then(result => {
      setUserImg(result.data)
      setIsLoading(false)
    })
    .catch(error => {
      console.log(`Error: ${error}`)
    }

    )
  },[]) 
  
  if(isLoading){
    return(<Loading></Loading>)
  }else{
    return (
      <div>
        <h1>User Profile Page</h1>
        <UserName userID = {id}></UserName>
        <div style = {{width: "100%", display: "flex", flexWrap: "wrap", justifyContent:"center"}}>
          {userImg.map(value => {
            return (
              <Image
              src={value.url}
              width="300"
              height="300"
              alt="My awesome image"
              style = {{margin: "10px"}}
              />
                // <img alt = "User's Post"style = {{width: "300px", height:"300px", margin: "20px"}} src = {value.url}/>
            )
          })
        }
        </div>
      </div>
    )
  }
}
export default UserProfilePage
