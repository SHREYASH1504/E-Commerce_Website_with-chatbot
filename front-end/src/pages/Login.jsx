import React from 'react';
import { useContext } from 'react';
import { useState } from 'react'; 
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';


const Login = () => {
  const [currentState, setCurrentState] = useState('Login');
  const {token, setToken, navigate, backendUrl} = useContext(ShopContext);

  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  // Define a default backend URL in case the context value is undefined
  const apiBaseUrl = backendUrl || 'http://localhost:4000/'; // Adjust this to your actual backend URL
  
  // Assuming the userRouter is mounted at '/api/user' in your main server file
  // If it's mounted differently, adjust this prefix
  const apiPrefix = 'api/user/';

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    setError('');
    try {
      // Construct the full API endpoint
      const endpoint = currentState === 'SignUp' ? 'register' : 'login';
      const apiEndpoint = `${apiBaseUrl}${apiPrefix}${endpoint}`;
      
      console.log("API request to:", apiEndpoint);
      
      if(currentState === 'SignUp'){
        const response = await axios.post(apiEndpoint, {name, email, password});
        console.log("Signup successful:", response.data);
        // Handle successful signup
        if (response.data && response.data.token) {
          setToken(response.data.token);
          localStorage.setItem('token',response.data.token)
        }else{
          toast.error(response.data.message)
        }
      }
      // Login API
      else {
        const response = await axios.post(apiEndpoint, {email, password});
        console.log("Login successful:", response.data);
        // Handle successful login
        if (response.data && response.data.token) {
          setToken(response.data.token);
          localStorage.setItem('token',response.data.token)
        }
        else{
          toast.error(response.data.message)
        }
      }
    } catch (error) {
      console.error('Authentication error:', error);
      toast.error(error)
    }
  }

  useEffect(()=>{
    if(token){
      navigate('/')
    }
  },[token])

  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800'>
      <div className='inline flex items-center gap-2 mb-2 mt-10'>
        <p className='prata-regular text-3xl'>{currentState}</p>
        <hr className='border-none h-[1.5px] w-8 bg-gray-800' />
      </div>
      
      {error && <div className='w-full p-2 bg-red-100 text-red-700 border border-red-300 rounded'>{error}</div>}
      
      {currentState === 'Login' ? '' : <input onChange={(e)=>setName(e.target.value)} value={name} type="text" className='w-full px-3 py-2 border border-gray-800' placeholder='Name' required />}
      <input onChange={(e)=>setEmail(e.target.value)} value={email} type="email" className='w-full px-3 py-2 border border-gray-800' placeholder='E-mail' required />
      <input onChange={(e)=>setPassword(e.target.value)} value={password} type="password" className='w-full px-3 py-2 border border-gray-800' placeholder='Password' required />

      <div className='w-full flex justify-between text-sm mt-[-8px]'>
        <p className='cursor-pointer'>Forgot your password?</p>
        {
          currentState === 'Login'
          ? <p onClick={()=>setCurrentState('SignUp')} className='cursor-pointer'>Create Account</p>
          : <p onClick={()=>setCurrentState('Login')} className='cursor-pointer'>Login Here</p>
        }
      </div>
      <button className='bg-black text-white mt-4 px-8 py-2 font-light'>{currentState === 'Login' ? 'Sign In' : 'Sign Up'}</button>
    </form>
  )
}

export default Login