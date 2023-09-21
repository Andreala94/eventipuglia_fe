import React from "react";
import Carousel from 'react-bootstrap/Carousel';
import '../Welcome/Carosello.css'



function Carosello() {
  return (
    <div className="container dimensione">
      <div className="justify-content-center">
        <Carousel className="m-lg-5 p-lg-3  ">
          <Carousel.Item className="carosello">
            <img
              className=" img-fluid "
              src="https://siviaggia.it/wp-content/uploads/sites/2/2019/08/puglia_poster.jpg" //1
              alt="First slide"
            />
          </Carousel.Item>

          <Carousel.Item className="carosello">
            <img
              className=" img-fluid "
              src="https://res.cloudinary.com/dsmb3mzsp/image/upload/v1694104706/CapstoneEpicode/otranto-puglia_yipal8.jpg" //2
              alt="Second slide"
            />
           </Carousel.Item>

          <Carousel.Item className="carosello">
            <img
              className=" img-fluid"
              src="https://res.cloudinary.com/dsmb3mzsp/image/upload/v1694104762/CapstoneEpicode/cava_hhvgfo.jpg"
              alt="Third slide"
            />
           </Carousel.Item>

           <Carousel.Item className="carosello">
            <img
              className=" img-fluid"
              src="https://res.cloudinary.com/dsmb3mzsp/image/upload/v1694104705/CapstoneEpicode/maldive-del-salento_zszz5f.jpg"
              alt="Third slide"
            />
           </Carousel.Item>

           <Carousel.Item className="carosello">
            <img
              className=" img-fluid"
              src="https://res.cloudinary.com/dsmb3mzsp/image/upload/v1694104706/CapstoneEpicode/Martina_Franca_vcdws3.jpg"
              alt="Third slide"
            />
           </Carousel.Item>

        </Carousel>
      </div>
    </div>
  );



}

export default Carosello