import React, {  useState } from "react"
import NavBar from '../NavBar/NavBar'
import { useNavigate } from 'react-router-dom';
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../Pages/CSS/Login.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';


function Login(){

    const [loginFormData, setLoginFormData] = useState({})
    const [registerFormData, setRegisterFormData ] = useState({})
    const [avatar, setAvatar] = useState(null)
    const navigate = useNavigate();
    const [authMode, setAuthMode] = useState("login")

 

  const changeAuthMode = () => {
    setAuthMode(authMode === "signin" ? "login" : "signin")
  }
//Login 
  const handleLogin = async(e)=>{
    e.preventDefault()
    try {
        const response = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/login/authors`, {
            method: "POST",
            body: JSON.stringify(loginFormData),
            headers: {"Content-Type":"application/json"}
        })
        const risposta = await response.json()
            if(response.status===200){
              // utente loggato con successo 
              
                localStorage.setItem('userToken', JSON.stringify(risposta.token))
                localStorage.setItem('userAvatar', JSON.stringify(risposta.avatar))
                localStorage.setItem('userName', JSON.stringify(risposta.name))
                localStorage.setItem('idUtente', JSON.stringify(risposta.idUtente))
            
                
              
              navigate('/') 
              
            }else{
              // notifica in caso di errore
              toast.error(risposta.message, { 
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
       
    } catch (error) {
      
        console.log('errore',error);
        
    }
  }
//Registrazione Avatar
  const uploadAvatar = async (file)=>{
    const avatarFile = new FormData()
    avatarFile.append('avatar', file)
    try {
        const response = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/authors/cloudUpload`, {
            method: "POST",
            body: avatarFile
        })
            
        return await response.json()
    } catch (error) {
        console.log(error);
    }
  }
  // Registrazione 
  const handleRegister = async(e)=>{
    e.preventDefault()

    try {
        const uploadAvatarImage = await uploadAvatar(avatar)
            const formDataWithAvatar ={
                ...registerFormData,
                avatar: uploadAvatarImage.avatar}

        const response = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/register/authors`, {
            method: "POST",
            body: JSON.stringify(formDataWithAvatar),
            headers: {"Content-Type":"application/json"}
        })
            
         await response.json()
         toast.success("Registrazione avvenuta con successo!", { 
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          });
          setAuthMode('login')



    } catch (error) {
        console.log(error.json());
        
    }
  }

  const onChangeHandleFile = (e) =>{
    setAvatar(e.target.files[0])
  }


  return(
    <>
    <NavBar />
   

  {
    authMode === "signin" && ( 
    <div className="Auth-form-container d-flex justify-content-center align-items-center p-5">
    <form className="Auth-form form-color p-4 border rounded-5" onSubmit={handleRegister}>
      <div className="Auth-form-content">
        <h3 className="Auth-form-title text-center">Registrati</h3>
        <div className="text-center  fw-bold">
          Sei registrato?{" "}
          <span className="link-primary" onClick={changeAuthMode}>
            Login
          </span>
        </div>
        <div className="form-group mt-3 fw-bold">
          <label>Nome</label>
          <input
            type="text"
            className="form-control mt-1 border border-dark"
            onChange={(e)=>setRegisterFormData({
                ...registerFormData,
                name:e.target.value})}
          />
        </div>
        <div className="form-group mt-3 fw-bold">
          <label>Cognome</label>
          <input
            type="text"
            className="form-control mt-1 border border-dark"
            onChange={(e)=>setRegisterFormData({
                ...registerFormData,
                surname:e.target.value})}
          />
        </div>
        <div className="form-group mt-3 fw-bold ">
          <label>Email address</label>
          <input
            type="email"
            className="form-control mt-1 border border-dark"
            onChange={(e)=>setRegisterFormData({
                ...registerFormData,
                email:e.target.value})}
          />
        </div>
        <div className="form-group mt-3 fw-bold">
          <label>Password (min 10 caratteri) </label>
          <input
            type="password"
            className="form-control mt-1 border border-dark"
            onChange={(e)=>setRegisterFormData({
                ...registerFormData,
                password:e.target.value})}
          />
        </div>
        <div className="form-group mt-3 fw-bold">
          <label>Avatar</label>
          <input
            type="file"
            className="form-control mt-1 border border-dark"
            placeholder="Avatar"
            onChange={onChangeHandleFile}
          />
        </div>
        <div className="form-group mt-3 fw-bold">
          <label>Data di Nascita</label>
          <input
            type="date"
            className="form-control mt-1 border border-dark"
            placeholder="Date"
            onChange={(e)=>setRegisterFormData({
                ...registerFormData,
                dob:e.target.value})}
          />
        </div>
        <div className="d-grid gap-2 mt-3">
          <button type="submit" className="btn btn-success">
            Registrati
          </button>
        </div>
       
      </div>
    </form>
  </div>
  )
  }
  {
    authMode === "login" && (
      <div className="Auth-form-container d-flex justify-content-center align-items-center p-5" >
      <form className="Auth-form form-color p-4 border rounded-5 " onSubmit={handleLogin}>
        <div className="Auth-form-content">
          <h3 className="Auth-form-title text-center">Login</h3>
          <div className="text-center fw-bolder">
          Non sei registrato? {" "}
            <span className="link-primary " onClick={changeAuthMode}>
              Register
            </span>
          </div>
          <div className="form-group mt-3 fw-bold">
            <label>Email  <FontAwesomeIcon icon={faEnvelope} /></label>
            <input 
              type="email"
              placeholder="Email "
              
              className="form-control mt-1 border border-dark"
              onChange={(e)=>setLoginFormData({
                ...loginFormData,
                email:e.target.value
            })}
            />
            
          </div>
          <div className="form-group mt-3 fw-bold">
            <label>Password <FontAwesomeIcon icon={faLock} /></label>
            <input
              type="password"
              placeholder="Password"
              className="form-control mt-1 border border-dark"
              onChange={(e)=>setLoginFormData({
                ...loginFormData,
                password:e.target.value
            })}
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-success">
              Accedi
            </button>
          </div>
          
        </div>
      </form>
    </div>

    )
  }
  
  </>
  )
  
}
export default Login