import React, { useState, useEffect } from "react"
import NavBar from '../NavBar/NavBar'
import Carosello from "../Welcome/Carosello"
import NewEvents from "../Pages/NewEvents"
import ListaEventi from "../CardEventi/ListaEventi"
import { Footer } from "../Footer/Footer"


import 'react-toastify/dist/ReactToastify.css';



function HomePage(){

  const [arrayEventi, setArrayEventi] = useState([])
  const [totaleEventi, setTotaleEventi] = useState([])
  const [isLoading, setIsLoading] = useState(true);

    const getEventiApi = async () => {
        try {
            const data = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/eventi`)

            const response = await data.json()

            setArrayEventi(response.eventi)
            setTotaleEventi(response.eventi)
            setIsLoading(false);
        } catch (error) {
            console.log('Errore nella risposta!')
        }
    }

    useEffect(() => {
        getEventiApi()
    }, [])




  return(
    <>
    <NavBar totaleEventi={totaleEventi} setArrayEventi={setArrayEventi} />
    <Carosello />  
    <NewEvents  />
    {isLoading ? <span style={{"backgroundColor": "red"}}>Loading...</span> : <ListaEventi eventi={arrayEventi} />}
    <Footer />
   
    </>

  
  )
  
}


export default HomePage