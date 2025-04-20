import React, {useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import Header from '../Header';


function Login() {

  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")
  const navigate=useNavigate();
  const [errorMessage, setErrorMessage] = useState('');

    useEffect(()=>{
      if(localStorage.getItem('user-info')){
        navigate("/addReport")
      }
    },[])

    async function signIn(){
      let item={email,password}
      console.warn(item);
       let result = await fetch("http://localhost:8000/api/login",{
        method:'POST',
        body:JSON.stringify(item),
        headers:{
          "Content-Type":'application/json',
          "Accept":'application/json'
        }
      })
      if(result.ok){
        result = await result.json()
        localStorage.setItem("user-info",JSON.stringify(result))
        navigate("/")
      } else if(result.status === 401) {
        setErrorMessage(result.message || 'Registration failed due to invalid credentials.');
        alert(errorMessage);
      } else {
        setErrorMessage(`Registration failed with status: ${result.status}`);
        alert(errorMessage);
      }

    }

  return (
    <>
    <Header/>
    <div className="col-sm-6 offset-sm-3">
      <h1>Login Page</h1>
      <input type="text" value={email} onChange={(e)=>setEmail(e.target.value)} className="form-control" placeholder="email"></input>      <br/>
      <input type="password" password={password} onChange={(e)=>setPassword(e.target.value)} className="form-control" placeholder="password"></input>   <br/>
      <button onClick={signIn} className="btn-btn-primary">Sign In</button>
    </div>
    </>
  )
  }

export default Login