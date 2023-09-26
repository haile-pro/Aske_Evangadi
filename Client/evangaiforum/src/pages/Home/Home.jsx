 import React, { useContext, useEffect, useState } from 'react'
 import Header from '../../components/Header/Header'
 import Questiona from '../../components/Questiona/Questiona'
 import { AuthContext } from '../../components/Authv1/AuthConetxt'
 import { axiosInstance, endPoint } from '../../endPoint/api'
 import Cookies from 'js-cookie'

const Home = () => {
  const {state}=useContext(AuthContext);
  const [questions, setQuestions]=useState([]);
  console.log(state);
  useEffect(()=>{
    const token= Cookies.get("accessToken")
    axiosInstance.get(endPoint.QUESTIONS,{
      headers:{
        Authorization:`Bearer ${token}`,
      },
    }).then((res)=>{
      //console.log(res.data);
      setQuestions(res.data.questions)

    }).catch((err)=>{
      console.log(err)
    })
  },[])


  return (
   <section>
      <Header/>
      <div className='d-flex justify-content-around pt-5 bg-body-tertiary'>
        <button className='btn  btn-primary fw-bold px-5 action-btn'>Ask Question</button>
        <p className='fw-semibold'>
           <span className='text-warning'> Wellcom, </span>{state?.user?.firstName}   {state?.user?.lastName}
        </p>
      </div>
      <div className='container mt-5'>
        <h2>Questions</h2>
        
        {
        questions?.map((question)=>{
          return <Questiona 
          key={question.questionId} 
          id={question.questionId}
          firstName={question.firstName} 
          lastName={question.lastName} 
          question={question.question}/>
        })
      }
      </div>
   </section>
   
  )
}

export default Home