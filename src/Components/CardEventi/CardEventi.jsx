import React from "react";
import { Button } from 'react-bootstrap'
import Card from 'react-bootstrap/Card'
import { Link } from "react-router-dom";
import {  toast } from 'react-toastify';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';

import '../CardEventi/CardEventi.css'


//? Struttura Card 

const CardEventi = ({ img, prezzo, title, luogo, data, descrizione, id }) => {

// è una funzione per ad es la descrizione, se supera più di 10 carattere mi inserisce i tre puntini(...)
  const truncate = (str, max, len) => {
    return str.length > max ? str.substring(0, len) + "..." : str;
  }

 //? Funzione al click del bottone 'acquista' mi deve salvare tramite id in localStorage il biglietto

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
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      });
     
  }


  return (
    <Card id={id} className='card' style={{ "margin": "0.5rem"}} >
      <Card.Img variant="top" src={img} style={{ "width": "100%", "height": "auto" }} />
      <Card.Body>
        <label className="mb-1">Titolo:</label>
        <Card.Title>{title}</Card.Title>

        <label className="mb-1 fw-bold">Descrizione:</label>
         <Card.Text >{truncate(descrizione, 50, 100)}</Card.Text> 

        <label className="mb-1">Luogo:</label>
        <Card.Text className="fw-bold"><FontAwesomeIcon icon={faLocationDot} /> {luogo}</Card.Text>

        <label className="mb-1">Data Evento:</label>
        <Card.Text className="fw-bold">{data}</Card.Text>


        <Card.Text><Link to={`/dettagli/${id}`}>Dettagli</Link></Card.Text>

        <label className="mb-1">Prezzo:</label>
        <Card.Text className="fw-bold">{prezzo === 0 ? "Gratis" : (prezzo + "€")}</Card.Text>

        <Button onClick={acquistoBiglietto} variant="btn btn-success">Acquista</Button>
      </Card.Body>
    </Card>

    
  )
}

export default CardEventi