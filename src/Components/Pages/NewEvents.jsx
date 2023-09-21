import React from 'react'
import Button from 'react-bootstrap/esm/Button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import '../Pages/CSS/NewEvents.css'
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function NewEvents( ) {
    const navigate = useNavigate();
    
    //Al click del bottone controlla se c'è il token, cioè se siamo loggati oppure no
    const handleRedirect = ()=>{
      if( localStorage.getItem('userToken') === null  ){
       
        toast.error('Non Autenticato! Accedi', { 
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              theme: "colored",
               });
               setTimeout(()=>{
                  navigate('/login')
               },2000)
      }else{
        navigate('/newevent')
      }
    }
  return (
   
   
    <div className='row m-0 px-5'>
       <div className='col-12' >
       <Button className='float-end me-5 mt-5'  id='bottone' variant="outline-light bg-success" onClick={handleRedirect}> <FontAwesomeIcon icon={faPlus} className='me-2'  />Crea Evento</Button>
       </div>
      </div>
  
     
    )
};

export default NewEvents