import { useState } from 'react';
import { Button, Container, Row, Col, Offcanvas, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import '../Shop/Shop.css';


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faTrash, faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';



function Shop() {

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => {
    setCarrello(JSON.parse(localStorage.getItem("carrello")) || [])
    setShow(true);
  }
  const [carrello, setCarrello] = useState(JSON.parse(localStorage.getItem("carrello")) || []);
  const navigate = useNavigate();

  const routeAcquista = async () => {
    if (carrello.length === 0) {
      toast.error('Nessun Evento nel carrello!', {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else {
      try {
         await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/shop/biglietto`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              "carrello": JSON.parse(localStorage.getItem("carrello")),
              "idUtente": JSON.parse(localStorage.getItem("idUtente"))

            })
          });

        localStorage.removeItem("carrello")
        navigate('/profilo')

      } catch (error) {
        toast.error('Errore nell\'acquisto dei biglietti!', {
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


    }
  }



  //Somma prezzo carrello

  const calcolaTotaleCarrello = () => {
    let totale = 0;

    if (carrello) {
      for (const biglietto of carrello) {
        if (!isNaN(parseInt(biglietto.prezzo))) {
          totale += parseInt(biglietto.prezzo) * biglietto.quantita
        }
      }
    }

    return totale;
  };

  //Rimozione biglietto dal carrello
  const rimuoviBiglietto = (id) => {

    const carrello = JSON.parse(localStorage.getItem("carrello"))
    const nuovoCarrello = carrello.filter((biglietto) => biglietto.id !== id);

    setCarrello(nuovoCarrello);
    localStorage.setItem("carrello", JSON.stringify(nuovoCarrello));
    toast.error('Evento eliminato!', {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });

  };




  //Incremento e decremento quantità 
  const incrementaQuantita = (id, incremento) => {

    const carrello = JSON.parse(localStorage.getItem("carrello"))
    const bigliettoEvento = carrello.find((biglietto) => biglietto.id === id);

    if (bigliettoEvento) {
      //il biglietto esiste nel carrello

      if (incremento === true) {
        bigliettoEvento.quantita++;

      } else if (bigliettoEvento.quantita > 1) {
        bigliettoEvento.quantita--;
      }

      localStorage.setItem("carrello", JSON.stringify(carrello));
      setCarrello(carrello)

    }
  };




  return (
    <>
      <Button style={{ "position": "relative" }} className='ms-2' variant="outline-success" onClick={handleShow}>
        <FontAwesomeIcon icon={faShoppingCart} />
       {/* <span id='notifica'></span> */}
      </Button>

      <Offcanvas show={show} onHide={handleClose} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>
            <FontAwesomeIcon icon={faShoppingCart} />  ( Cad. )
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Container>
            <Row>
              <Col>
                {carrello ? (
                  carrello.map((biglietto) => (
                    <>
                      <div className='d-flex ' >
                        <Row>
                          <div className='col-3'>

                            <Card.Img variant="top" src={biglietto.immagine} style={{ "width": "100%" }} />
                          </div>

                          <div className='col-5'>
                            <Card.Title>{biglietto.titolo}</Card.Title>
                            <Card.Text className="fw-bold">{biglietto.prezzo === 0 ? "Gratis" : (biglietto.prezzo + "€")}</Card.Text>
                          </div>


                          <Col className='p-0'>
                            <Button className='bg-success rounded-circle py-1 px-2 border-0' onClick={() => incrementaQuantita(biglietto.id, false)}><FontAwesomeIcon icon={faMinus} /></Button>
                          </Col>
                          <Col className=' p-0  '>


                            <input type="text" disabled value={biglietto.quantita} className='mx-0 text-center w-100' />

                          </Col>
                          <Col className='p-0 ms-2 '>
                            <Button className='bg-success rounded-circle py-1 px-2 border-0 m-0' onClick={() => incrementaQuantita(biglietto.id, true)}><FontAwesomeIcon icon={faPlus} /></Button>
                            <Button className='bg-danger border-0 p-1 mt-2' onClick={() => rimuoviBiglietto(biglietto.id)}><FontAwesomeIcon icon={faTrash} /></Button>
                          </Col>


                        </Row>
                      </div>
                      <hr></hr>

                    </>
                  )
                  )
                )
                  : (<p>Carello Vuoto...</p>)}

                <p>Totale: € {calcolaTotaleCarrello()} </p>
              </Col>
            </Row>
            {localStorage.getItem('userToken') === null ? (
              // L'utente non è autenticato, mostra il bottone disabilitato
              <div className="text-center bg-light p-2">
                <p>Effettua Login</p>
                <Button variant="success" disabled>Acquista</Button>
              </div>
            ) : (
              // L'utente è autenticato, mostra il bottone abilitato
              <div className="text-center bg-light p-3">
                <Button variant="success" onClick={routeAcquista}>Acquista</Button>
              </div>
            )}


          </Container>

        </Offcanvas.Body>

      </Offcanvas>
    </>
  );
}

export default Shop;