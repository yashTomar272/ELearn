
import Carousel from "react-bootstrap/Carousel";
import PhotoFirst from "../imgs/walfirst.png"
import PhotoSecond from "../imgs/walsecond.jpg"
import { Navigate, useNavigate } from "react-router-dom";

export default function Sidemain() {
  const navigate=useNavigate();
  return (
    <>
      <UncontrolledExample />
      
    </>
  );
}
function UncontrolledExample() {
 
  return (
    <Carousel className="homepage">
      <Carousel.Item>
        <SlideMain indx={0} />
      </Carousel.Item>
      <Carousel.Item>
        <SlideMain indx={1} />
      </Carousel.Item>
      
    </Carousel>
  );
}
function SlideMain({ indx }) {
  const slideData = [
    {
      title: "Web Development for Beginners",
      description: `Learn how to build modern, responsive websites from scratch using HTML, CSS, and JavaScript.
Master the foundations of front-end and back-end development to kickstart your tech career.
Perfect for aspiring developers looking to enter the world of web and app creation.`,
      buttonText: "Learn Now",
      image: PhotoFirst,
    },
    
    {
      title: "Web Development for Beginners",
      description: `Learn how to build modern, responsive websites from scratch using HTML, CSS, and JavaScript.
Master the foundations of front-end and back-end development to kickstart your tech career.
Perfect for aspiring developers looking to enter the world of web and app creation.`,
      buttonText: "Learn Now",
      image: PhotoSecond,
    },
    
  ];
  const navigate=useNavigate();
  return (
    <>
     <div
  style={{
    backgroundImage: `url(${slideData[indx].image})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    width: '100%',
    height: '430px'
  }}

      className='d-flex justify-content-center flex-column ps-5'>
      
      <div className='' style={{width:"400px"}}>
              <h1 style={{fontSize:"24.5px"}} className='FONT  text-white'>{slideData[indx].title}</h1>
          <p style={{fontSize:"16.5px"}} className='  text-white'>{slideData[indx].description}</p>
      <div className='d-flex flex-row justify-content-between align-items-center'>
      
      <button className='see_btn' >{slideData[indx].buttonText}</button>
      </div>
      </div>
         </div>
    </>
  );
}
