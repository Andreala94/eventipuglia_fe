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

      <Container className="form-color d-flex flex-column align-items-center p-3 mt-5 border rounded-5">
        <Card style={{ width: '18rem' }}>
          <Card.Img variant="top" src={getUserAvatar()} />
          <Card.Body>
            <Card.Title>Ciao: {getUserName()}</Card.Title>
          </Card.Body>
        </Card>
        <p className='fw-bold mb-5 mt-3'>I miei ordini:</p>

        <Row>
          {biglietti &&
            biglietti.map((biglietto) => (
              
              <div md={6} lg={4} sm={6} xl={3} className="mb-4">
                <img src={biglietto.immagine} style={{ "width": "10rem", "height": "5rem", "margin-bottom": "2px" }} />
                <ul className="list-group">
                  <li className="list-group-item">
                    <label className="mb-1">Titolo:</label>
                    <span>{biglietto.titolo}</span>
                  </li>
                  <li className="list-group-item">
                    <label className="mb-1">Prezzo:</label>
                    <span>{biglietto.prezzo}</span>
                  </li>
                  <li className="list-group-item">
                    <label className="mb-1">Quantità:</label>
                    <span>{biglietto.quantita}</span>
                  </li>
                </ul>
              </div>
            ))}
        </Row>


        {/* <Row>
                    {biglietti &&
                       biglietti.map((biglietto) => (
                            <Col
                                
                            md={6}
                            lg={4}
                            sm={6}
                            xl={3}
                            className="mb-4"
                            >
                              <Card className='d-flex' style={{ "width": "10rem"}}>
                              <Card.Img style={{ "width": "10rem"}} variant="top" src={biglietto.immagine}  />
                              <Card.Body>
                              <label className="mb-1 ">Titolo:</label>
                                <Card.Title>{biglietto.titolo}</Card.Title>
                                <label className="mb-1">Prezzo:</label>
                                <Card.Text >{biglietto.prezzo}</Card.Text> 
                                <label className="mb-1">Quantita:</label>
                                <Card.Text >{biglietto.quantita}</Card.Text> 

                              </Card.Body>

                              </Card>
                            </Col>
                        ))}
                </Row> */}



      </Container>
    </>

  )
}
export default Profilo;