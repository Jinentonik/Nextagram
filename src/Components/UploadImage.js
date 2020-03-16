import React, {useState} from 'react'
import Axios from 'axios'
import { Form, Label, Input} from 'reactstrap';
import {toast} from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.min.css';
import './UploadImage.css'
import {useHistory} from 'react-router-dom'

const UploadImage = (props) => {
    const {imageFile, setImageFile, uploadImgModal, setUploadImgModal} = props
    // const [imageFile, setImageFile] = useState(null)
    const [previewImage, setPreviewImage] = useState(null)
    const [message, setMessage] = useState('')
    const history = useHistory()

    const handleFile = (e) => {
        setImageFile(e.target.files[0])
        setPreviewImage(URL.createObjectURL(e.target.files[0]))
        setMessage('uploaded')
        
    }

    const closeModal = () => {
        setUploadImgModal(false)
    }

    const handleSubmit = (e) => {
        console.log(e.target)
        e.preventDefault()
        let token = localStorage.getItem("token")

        let formData = new FormData()

        formData.append("image", imageFile)

        Axios({
            url:'https://insta.nextacademy.com/api/v1/images/',
            method: "POST",
            data: formData,
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(result =>{
            console.log(result)
            if(result.data.success){
                toast.success('Images uploaded successful')
                setImageFile(null)
                setPreviewImage(null)
                setUploadImgModal(false)
                window.location.reload()
            }
        }
        )
        .catch(err => console.log(err.response))
    }

    return(
    <div style = {{
        width: "100vw", 
        height: "100vh",
        position: "fixed",
        display:uploadImgModal? "flex" : "none",
        justifyContent:"center",
        alignItems:"center",
        top: "0",
        left:"0",
        backgroundColor:"rgba(0,0,0,0.8)",
        zIndex:"10"
        }}>
            <div style ={{
                 width: "600px", 
                 height: "500px", 
                 backgroundColor:"white", 
                 display: "flex",
                 flexDirection:"column"
            }}>
                <div style = {{width: "600px", height: "300px"}}>
                    <h1>Your preview image shows here.</h1>
                    <div>
                    {
                        previewImage
                        ? <img src = {previewImage} width = "250" height = "230" ></img>
                        :(<h3>
                            {message?"live preview": message}
                        </h3>)
                        }
                    </div>
                </div>
                <Form onSubmit = {(e)=>handleSubmit(e)}>
                   
                    <Label id = "label" for="uploadImgFile">Choose an image</Label>
                    <Input className = "inputfile" type="file" name="image-file" id="uploadImgFile" onChange = {(e) => handleFile(e)}/>
                    
                    <div style = {{display: "flex", justifyContent:"space-evenly", position:"relative", top: "120px"}}>
                        <input className = "imgBtn" type = "submit" />
                        <button className = "imgBtn" onClick = {closeModal}>Close</button>
                    </div>
                </Form>
            </div>
        </div>
        // <div>
        //     <form onSubmit = {(e)=>handleSubmit(e)}>
        //         <input type = "file" name = "image-file" onChange = {(e)=>handleFile(e)} ></input>
        //         <input type = "submit"></input>
        //     </form>
        //     <div>
        //         {
        //             previewImage
        //             ? <img src = {previewImage} width = "200" height = "200" ></img>
        //             :(<h3>
        //                 {message?"live preview": message}
        //             </h3>)
        //         }
        //     </div>
        // </div>
        
    )

}

export default UploadImage  