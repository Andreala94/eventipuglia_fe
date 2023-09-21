import React, { useEffect } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import CardEventi from './CardEventi'

//? Creazione Card Evento con lista di informazioni

const ListaEventi = ( { eventi } ) => {

    useEffect(() => {

    }, [])

    return (
        <>
            <Container className="mt-5" id='listaeventi'>
                <Row>
                    {eventi &&
                        eventi.map((evento) => (
                            <Col
                                
                                md={6}
                                lg={4}
                                sm={6}
                                xl={3}
                                className="mb-4"
                            >
                                <CardEventi
                                    
                                    id={evento._id}
                                    img={evento.immagine}
                                    prezzo={evento.prezzo}
                                    title={evento.titolo}
                                    luogo={evento.luogo}
                                    data={evento.datetime}
                                    descrizione={evento.descrizione}
                                    
                                />
                            </Col>
                        ))}
                </Row>

               
            </Container>
        </>
    )
}

export default ListaEventi