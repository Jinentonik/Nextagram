import React, {useState, useEffect} from 'react'
import Axios from 'axios'
import Image from 'react-graceful-image'
import UploadImage from '../Components/UploadImage'
import {useHistory} from 'react-router-dom'
import Loading from '../Components/loading'
import 'bootstrap/dist/css/bootstrap.min.css';

const MyProfilePage = () => {
    const [imageFile, setImageFile] = useState(null)
    const [data, setData] = useState([])
    const [imgData, setImgData] = useState([])
    const token = localStorage.getItem("token")
    const history = useHistory()
    const [loading, setLoading] = useState(true)
    const [uploadImgModal, setUploadImgModal] = useState(false)


    // if(token === null){
    //     history.push("/")
    // }

    const showUploadForm = () => {
        setUploadImgModal(true)
    }

    useEffect(() => {
        Axios({
            url: "https://insta.nextacademy.com/api/v1/users/me",
            method: "GET",
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
            } 
        })
        .then( result => {
                // console.log(result.data)
                setData(result.data)
                // console.log(result.data.username)
                Axios(
                    {
                        url: `https://insta.nextacademy.com/api/v1/images/me` ,
                        method:"GET",
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("token")}`
                        }
                    }
                )
                .then(result =>{
                    // console.log(result.data)
                    setImgData(result.data)
                    setLoading(false)
                })
                .catch(err => console.log(err.response))
            }
        )
        .catch(err => console.log(err.response))
    }, [])



    if(token === null){
        history.push("/")
        return <div></div>
    }else{
        if(loading){
            return <Loading></Loading>
        }else{
            return(
                <div>
                    <h1>{data.username}</h1>
                    <img src = {data.profile_picture} style = {{borderRadius: "50%"}}></img>
                    <UploadImage uploadImgModal = {uploadImgModal} setUploadImgModal = {setUploadImgModal} imageFile = {imageFile} setImageFile = {setImageFile}></UploadImage>
                        <div>
                            <button style = {{backgroundColor: "lightskyblue"}} onClick = {showUploadForm}>Upload image</button>
                            <div style = {{width: "100%", display: "flex", flexWrap: "wrap", justifyContent:"center"}}>
                            {
                                imgData.map((item) => {
                                    return (
                                    
                                            <Image
                                                src={item}
                                                width="300"
                                                // height="200"
                                                alt="My image"
                                                style = {{margin: "10px"}}
                                            />
                                    
                                    )
                                })
                            }
                            </div>
                    </div>
                </div>
            )
        }
        
    }

        
    
}


export default MyProfilePage