import React from 'react'
import '../Footer/Footer.css'
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer >
      <div className='bgcolor'>
        <div className=" mt-5">

          <div className="upper">
            <div className="topic text-center text-dark  ">Chi Sono</div>
            <p className='text-dark text-center'>Un semplice ragazzo appassionato di tecnologia con la voglia d'imparare sempre cose nuove.</p>
          </div>
          <div className="lower  ">
            <div className="topic text-dark text-center ">Contatti</div>

            <div className="email text-dark">
              <Link href="#"><i className="fas fa-envelope" />andrea.lauro94@gmail.com</Link>
            </div>
          </div>

        </div>
        <div className="diritti bottom text-dark px-0 d-flex justify-content-center">
          <p className='my-2'>Copyright © 2023 Andrea Lauro</p>
        </div>

      </div>

      
    </footer>
  )
}

export default Footer;