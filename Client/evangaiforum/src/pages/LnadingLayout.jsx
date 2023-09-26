import React, { useState } from 'react'
import Header from '../components/Header/Header'
import bg from ".././assets/bg-svg-f.svg"
import Login from '../components/Login/Login'
import SignUp from '../components/SignUp/SignUp'
function LnadingLayout() {
 const[currentPage, setcurrentPage] =useState("Login")
  return (
    <div>
        <Header/>
         <main className='landing bg-body-tertiary'style={{background:`url(${bg})`,backgroundRepeat:'no-repeat',backgroundSize:'cover'}}>
                                
                <section className='container d-md-flex pt-5 gap-4 '>
                              {/* form login/sign up */} 
                        
                        {currentPage==="Login"&&<Login setcurrentPage={setcurrentPage}/>}
                        {currentPage==="SignUp"&&<SignUp setcurrentPage={setcurrentPage}/>}
                        
                      
                         {/* welcom message */}
                         <div className='col mt-5'>
                          <p className='account  mt-5'>About</p>
                          <h1 className='fw-semibold'style={{color:"#4B456F"}}>Evangadi Networks Q&A</h1>
                          <div className='d-flex  flex-column gap-4 '>
                             <p>
                             No matter what stage of life you are in, whether you’re just starting elementary school or being promoted to CEO of a Fortune 500 company, 
                             you have much to offer to those who are trying to follow in your footsteps.
                             </p>
                             <p>
                              Wheather you are willing to share your knowledge or you are just looking to 
                              meet mentors of your own, please start by joining the network here.
                              </p>
                          </div>
                          <div>
                          <button className='btn btn-primary py-2 px-5 mt-3'style={{backgroundColor:"#FE8402" ,border:"1px solid #FE8402" }}>
                            HOW IT WORKS
                          
                            </button>
                          </div>
                          </div>    
                </section>     
         </main>
    </div>
  )
}
export default LnadingLayout