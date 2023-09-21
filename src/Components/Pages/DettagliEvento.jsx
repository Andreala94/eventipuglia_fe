import React, { useState } from 'react'
import NavBar from '../NavBar/NavBar'
import { useParams } from 'react-router-dom'

import { Button, Row, Col, Container} from 'react-bootstrap'
import Card from 'react-bootstrap/Card'
import './CSS/DettagliEvento.css'


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import {  toast } from 'react-toastify';




 const DettagliEvento = (  {img, prezzo, title }) => {

    const [titleValue, setTitleValue] = useState('')
    const [descrizioneValue, setDescrizioneValue] = useState('')
    const [imgValue, setImgValue] = useState(null)
    const [luogoValue, setLuogoValue] = useState('')
    const [dataValue, setDataValue] = useState('')
    const [prezzoValue, setPrezzoValue] = useState('')
   

    const {id} = useParams()
    const getEventoById = async () => {
    try {
        const response = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/eventi/${id}`,
            {
                method: 'GET',
               
            }
        )
        const evento =  await response.json()

        setTitleValue(evento.evento.titolo)
        setLuogoValue(evento.evento.luogo)
        setImgValue(evento.evento.immagine)
        setDescrizioneValue(evento.evento.descrizione)
        setPrezzoValue(evento.evento.prezzo)
        setDataValue(evento.evento.datetime)

       
    } catch (error) {
        console.error('File uploads error!')
    }
}

getEventoById()


const acquistoBiglietto = () =>{

  let arrayBiglietti = JSON.parse(localStorage.getItem("carrello"))

  if(arrayBiglietti === null){
     arrayBiglietti = [] 
  }

 

  const biglietto = arrayBiglietti.find(biglietto => biglietto.id === id) //cerchiamo l'id nel nostro biglietto
  console.log(biglietto);
  

  if(biglietto){
    biglietto.quantita += 1
  }else{
    arrayBiglietti.push({
    id: id,
    titolo: title,
    prezzo: prezzo,
    quantita: 1,
    immagine: img
    
  })}

  localStorage.setItem("carrello" , JSON.stringify(arrayBiglietti) ) //prendiamo il nostro carrello di oggetti e lo trasformiamo in stringa
  
  toast.success('Evento Aggiunto al carrello!', { 
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
    });
  
  
   
}

  return (
    <>
    <NavBar />

    <Container className='d-flex justify-content-center p-5' >
      <Row>
        <Col>
        <Card>
        <Card.Img variant="top" src={imgValue} style={{"width": "100%" , "height": "auto"}} />
        <Card.Body>
          <label className="mb-1">Titolo:</label>
          <Card.Title>{titleValue}</Card.Title>

          <label className="mb-1 fw-bold">Descrizione:</label>
          <Card.Text >{descrizioneValue}</Card.Text>

          <label className="mb-1">Luogo:</label>
          <Card.Text className="fw-bold"><FontAwesomeIcon icon={faLocationDot} /> {luogoValue}</Card.Text>

          <label className="mb-1">Data Evento:</label>
          <Card.Text className="fw-bold">{dataValue}</Card.Text>
        

          <label className="mb-1">Prezzo:</label>
          <Card.Text className="fw-bold">{prezzoValue === 0 ? "Gratis" : (prezzoValue + "€")}</Card.Text>

          <Button  variant="outline-light bg-success" onClick={acquistoBiglietto}>Acquista</Button>
        </Card.Body>
      </Card> 
        </Col>
      </Row>
   
    </Container>
    </>
    
  )
}
export default DettagliEvento