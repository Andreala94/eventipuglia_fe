import React, { useEffect } from 'react'
import { Col, Row } from 'react-bootstrap'
import CardEventi from './CardEventi'

//? Creazione Card Evento con lista di informazioni

const ListaEventi = ( { eventi } ) => {

    useEffect(() => {

    }, [])

    return (
        <>
            <div className="mt-5 container content-row" id='listaeventi'>
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

               
            </div>
        </>
    )
}

export default ListaEventi