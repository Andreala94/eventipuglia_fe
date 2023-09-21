import React, { useEffect, useState } from 'react'
import NavBar from '../NavBar/NavBar';
import '../Pages/CSS/Profilo.css'
import { Card, Container, Col, Row } from 'react-bootstrap';


const Profilo = () => {

  const [biglietti, setBiglietti] = useState([])

  const getUserAvatar = () => {
    return JSON.parse(localStorage.getItem('userAvatar'))
  }

  //Funzione per prendere il nome utente Loggato
  const getUserName = () => {
    const name = JSON.parse(localStorage.getItem('userName'))
    return name.charAt(0).toUpperCase() + name.slice(1)
  }

  // Funzione  get tramite token per prendere i biglietti
  const getBigliettiShop = async () => {

    const idUtente = JSON.parse(localStorage.getItem('idUtente'))

    try {
      const response = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/shop/biglietto/${idUtente}`,
        {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' }
        })
      const biglietti = await response.json()
      setBiglietti(biglietti.biglietto)

    } catch (error) {
      console.log(error);
    }
  }




  useEffect(() => {
    getBigliettiShop()
  }, [])

  return (
    <>
      <NavBar />

      <Container className="form-color d-flex flex-column align-items-center  mt-5 border rounded-5  ">
        <Card className='mt-3' style={{ width: '18rem' }}>
          <Card.Img variant="top" src={getUserAvatar()} />
          <Card.Body>
            <Card.Title>Ciao: {getUserName()} benvenuto nella tua pagina profilo</Card.Title>
          </Card.Body>
        </Card>
        <h4 className='fw-bolder mb-5 mt-3'>I miei ordini:</h4>

        <Row className='mb-3 justify-content-center '>
          {biglietti &&
            biglietti.map((biglietto) => (
              <div className="card text-center m-2" style={{ width: '18rem' }}>
                <img src={biglietto.immagine} className="card-img-top" alt={biglietto.titolo} />
                <div className="card-body">
                  <h5 className="card-title">{biglietto.titolo}</h5>
                  <p className="card-text">Prezzo: {biglietto.prezzo} €</p>
                  <p className="card-text">Quantità: {biglietto.quantita}</p>
                  <p className="card-text">Acquistato il: {new Date(biglietto.createdAt).toLocaleDateString()} {new Date(biglietto.createdAt).toLocaleTimeString()}</p>
                </div>
              </div>

            ))}
        </Row>



      </Container>
    </>

  )
}
export default Profilo;