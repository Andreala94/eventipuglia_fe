import { ToastContainer, toast } from 'react-toastify';


//? Funzione al click del bottone 'acquista' mi deve salvare tramite id in localStorage il biglietto
export const acquistoBiglietto =  ( img, prezzo, title, id) => {

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
  
  