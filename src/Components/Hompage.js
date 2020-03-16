import React, {useEffect, useState} from 'react'
import Main from './main'
import axios from 'axios'
const Homepage = () => {
    const [data, setData] = useState([])
    const [currentAcc, setCurrentAcc] = useState('')
    const [loading, setLoading] = useState(true)

    useEffect(()=>{
        axios.get(`https://insta.nextacademy.com/api/v1/users`)
        .then( result => {
            setData(result.data)
            // console.log(result.data)
            setLoading(false)
        }
        )
        .catch( error => {
            console.log(`Error:`, error )
        })

        

    }, [])

    useEffect(() => {
        axios({
            url: "https://insta.nextacademy.com/api/v1/users/me",
            method: "GET",
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
            } 
        })
        .then( result => {
            console.log(result)
            console.log(result.data)
            console.log(result.data.username)
            setCurrentAcc(result.data)
            // console.log(result.data.user.username)
        })
        .catch(err => console.log(err.response))
    
    },[])
    
    return(
        <div>
            <div style = {{width:"55%"}}>
                <Main></Main>
            </div>
            <div style = {{width:"300px", height: "650px", position:"fixed", top:"100px", right:"250px"}}>
                <div style = {{backgroundColor:"lightskyblue"}}>
                    <div style = {{display:"flex"}}>
                        <div>
                            <img src = {currentAcc["profile_picture"]} style = {{padding:"5px", width: "50px", borderRadius:"50%"}}></img>
                        </div>
                        <div>
                            <p style = {{marginLeft:"10px"}}>{currentAcc.username}</p>  

                        </div>

                    </div>
                    <div style = {{height: "400px", overflow:"auto"}}>
                        {
                        data.map((data)=>{
                            return (
                                <div style = {{display:"flex", backgroundColor:"white"}}>
                                    <div>
                                        <img width = "30px" style = {{borderRadius:"50%"}} src = {data.profileImage}></img>
                                    </div>
                                    <div>
                                        <p style = {{marginLeft:"10px"}}>{data.username}</p>
                                    </div>
                                </div>
                            )
                            
                        })
                        }
                    </div>
                        
                </div>
            </div>

        </div>
    )
}

export default Homepage