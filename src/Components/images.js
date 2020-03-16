import React, {useState, useEffect} from 'react'
import axios from 'axios'
import Image from 'react-graceful-image'
import Loading from './loading'
import 'bootstrap/dist/css/bootstrap.min.css'
import {
    Carousel,
    CarouselItem,
    CarouselControl,
    CarouselIndicators,
    CarouselCaption
  } from 'reactstrap';

const ImgTab = (props) => {
    const {userID} = props
    const [imgData, setImgData] = useState([])
    const [loading, setLoading] = useState(true)
    const [activeIndex, setActiveIndex] = useState(0);
    const [animating, setAnimating] = useState(false);

    const next = () => {
        if (animating) return;
        const nextIndex = activeIndex === imgData.length - 1 ? 0 : activeIndex + 1;
        setActiveIndex(nextIndex);
      }
    
      const previous = () => {
        if (animating) return;
        const nextIndex = activeIndex === 0 ? imgData.length - 1 : activeIndex - 1;
        setActiveIndex(nextIndex);
      }
    
      const goToIndex = (newIndex) => {
        if (animating) return;
        setActiveIndex(newIndex);
      }

      const slides = imgData.map((item) => {
        return (
            <CarouselItem
            style = {{opacity: "1", backgroundColor:"black"}}
            onExiting={() => setAnimating(true)}
            onExited={() => setAnimating(false)}
            
          >
            {/* <img src={item.src} alt={item.altText} /> */}
            <Image
                                    src={item.url}
                                    width = "95%"
                                    height="400"
                                    alt="My awesome image"
                                    style = {{margin: "10px"}}
                                    />
           
          </CarouselItem>
        );
      });
    useEffect(() => {
            axios.get(`https://insta.nextacademy.com/api/v2/images?userId=${userID}`)
            .then(result => {
                setImgData(result.data)
                setLoading(false)
            })
            .catch(error => console.log(`Error:`, error))
    },[])
    
    
    if(loading){
        return (
            <Loading width = "100px" height = "100px" stroke = {`rgb(${Math.floor(Math.random()*255)}, ${Math.floor(Math.random()*255)}, ${Math.floor(Math.random()*255)})`}></Loading>
        )
    }else{
            return(
                <Carousel
                    activeIndex={activeIndex}
                    next={next}
                    previous={previous}
                >
                <CarouselIndicators items={imgData} activeIndex={activeIndex} onClickHandler={goToIndex} />
                {slides}
                <CarouselControl direction="prev" directionText="Previous" onClickHandler={previous} />
                <CarouselControl direction="next" directionText="Next" onClickHandler={next} />
                </Carousel>
            )
    }
        // return(
            // <div style ={{
            //     width: "100%", 
            //     display: "flex",
            //     flexWrap: "wrap"
            //     }}>
            //     {
            //         imgData.map((value) => {
            //                 return(
                                // <Image
                                //     src={value.url}
                                //     width="300"
                                //     height="300"
                                //     alt="My awesome image"
                                //     style = {{margin: "10px"}}
                                //     />
                                // <img key = {index} style = {{width: "200px", height: "250px", margin: "10px"}} src = {value.url}></img>
            //                 )  
                        
            //         })
            //     }
            
            // </div>
        // )
        
}

export default ImgTab