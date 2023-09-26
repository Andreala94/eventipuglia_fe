import React from 'react'
import '../Footer/Footer.css';


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
            <a href="https://mail.google.com" target="_blank">andrea.lauro94@gmail.com</a>.
              <p>
                Puoi trovare il mio profilo LinkedIn<br></br>
                <a href="https://www.linkedin.com/in/andrea-lauro-113b6225b/" target="_blank">Andrea Lauro</a>.
              </p>
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