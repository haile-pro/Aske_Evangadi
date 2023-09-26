import React, {useState,useContext} from 'react'
import { AuthContext } from '../Authv1/AuthConetxt'

function Login( {setcurrentPage}) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const {login,state} = useContext(AuthContext);
  console.log(state)
const submitHandler=(e)=>{
  e.preventDefault();
   login(email,password);
};



  return (

    <div className='col card p-5 text-center mt-5'>
     <div>
      <h5 className='m-3' style={{color:"#2D385E"}}>Login to your account</h5>
      <p mb-5="true">Don’t have an account? <a className='account' href='#' onClick={()=>setcurrentPage("SignUp")}>Create a new account</a></p>
     </div>
     <form onSubmit={submitHandler}>
      <div className='d-flex flex-column gap-3'>
        <input type='email' 
        className='form-control p-3' 
        placeholder='Email Address' 
        onChange={(e)=>setEmail(e.target.value)}
        />
         <input type='password' 
        className='form-control p-3' 
        placeholder='password' 
        onChange={(e)=>setPassword(e.target.value)}
        />
      </div>
      <div className='mt-3'>
        <p>
        <a href="" className='account d-flex justify-content-end '>Forgot password</a>
        </p>
      </div>
      <div className='d-grid'>
        <button type='submit' className=' btn btn-primary action-btn fs-5 '>Login</button>
      </div>
     </form>
       
    </div>
  )
}

export default Login