import React, { useContext,useState } from 'react'
import { AuthContext } from '../Authv1/AuthConetxt'

function SignUp({setcurrentPage}) {

  const [user, setUser] = useState({
    firstName:'',
    lastName:'',
    email:'',
    password:''
  });
const {signup} = useContext(AuthContext);


const submitHandler=(e)=>{
  e.preventDefault();
  signup(user.firstName,user.lastName,user.email,user.password);
}

  return (
    <div className='col card p-5 text-center mt-5'>
    <div>
     <h5 className='m-3' style={{color:"#2D385E"}}>Join the network</h5>
     <p mb-5>Already have an account?  <a className='account' href='#' onClick={()=>setcurrentPage("Login")}>Sign in</a></p>
    </div>
    <form onSubmit={submitHandler}>
     <div className='d-flex flex-column gap-3'>
       <input type='email' 
       className='form-control p-3' 
       placeholder='Email Address' 
       onChange={(e)=>setUser((prev)=>{return {...prev,email:e.target.value}})}
       />
       <div className='d-flex gap-4 ' >
       <input type='text ' 
       className='form-control p-3 ' 
       placeholder='First Name' 
       onChange={(e)=>setUser((prev)=>{return {...prev,firstName:e.target.value}})}

       />
        <input type='text' 
       className='form-control p-3' 
       placeholder='Last Name' 
       onChange={(e)=>setUser((prev)=>{return {...prev,lastName:e.target.value}})}
       />
       </div>
        <input type='password' 
       className='form-control p-3' 
       placeholder='password' 
       onChange={(e)=>setUser((prev)=>{return {...prev,password:e.target.value}})}
       />
     </div >
     <div className='p-3' >
      <small>I agree to the <a href="#"  style={{color:"#FE8402"}}>privacy policy</a> and <a href="#"style={{color:"#FE8402"}}>terms of service.</a></small>
     </div>
     <div className='d-grid'>
       <button type='submit' className=' btn btn-primary action-btn fs-5 '>Agree and Join</button>
       <div className='mt-3'>
       <p>
       <a href="" className='account d-flex justify-content-center ' onClick={()=>setcurrentPage("Login")}>Already have an account?</a>
       </p>
     </div>
     </div>
    </form>
      
   </div>
  )
}

export default SignUp