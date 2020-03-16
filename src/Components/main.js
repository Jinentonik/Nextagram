import React, {useState, useEffect} from 'react'
import axios from 'axios'
import Loading from './loading'
import {
    Card, CardImg, CardText, CardBody, CardLink,
    CardTitle, CardSubtitle, CarouselItem,
  } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css'
import ImgTab from './images'
import { Link } from "react-router-dom"

const Main = () => {
    const [data, setData] = useState([])
    const [loadingStatus, setLoadingStatus] = useState(true)
    useEffect(() => {
        axios.get(`https://insta.nextacademy.com/api/v1/users`)
        .then( result => {
            setData(result.data)
            // console.log(result.data)
            setLoadingStatus(false)
        }
        )
        .catch( error => {
            console.log(`Error:`, error )
        })
    }, [])


    
    if(loadingStatus){
        return <Loading></Loading>
    }else{
        return(
            <div>
                {
                    data.map((value, index) => {
                        return(
                            <div style = {{display:"flex", justifyContent:"flex-end"}}>
                                <Card style = {{width:"50%", margin: "10px"}}>
                                  <CardBody style = {{backgroundColor:"lightskyblue"}}>
                                    <div style = {{display: "flex"}}>
                                        <div>
                                            <img alt = "User Profile" src = {value.profileImage} style = {{width: "50px", borderRadius: "50%", border: "2px solid white", margin: "10px"}}></img>
                                        </div>
                                        <div style = {{textAlign:"center", display: "flex", alignItems:"center", marginLeft:"10px"}}>
                                            <Link to = {`/users/${value.id}`} userName = {value.username}>
                                                <CardTitle style = {{margin: "0", fontSize:"18px", color:"black"}} >{value.username}</CardTitle>
                                            </Link>
                                        </div>

                                    </div>
                                  </CardBody>
                                    <ImgTab userID = {value.id}></ImgTab>

                                  {/* <img width="100%" src="/assets/318x180.svg" alt="Card cap" /> */}
                                  <CardBody>
                                    <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
                                  </CardBody>
                                </Card>
                            </div>
                            
                        )
                    })
                }
            </div>
        )
    }
    }
            


export default Main