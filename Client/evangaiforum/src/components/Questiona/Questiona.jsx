import React from 'react'
import {ImUser} from "react-icons/im"
import {FaAngleRight}  from "react-icons/fa"

function Questiona({firstName,lastName,question}) {
  return (
    <a className='text-decoration-none text-black' href="#">
    <hr />
    <div className='d-flex justify-content-between'>
        <div className='d-md-flex align-items-center'>
       
        <div className='user d-flex flex-column align-items-center'>
         {/* user  */}
         <div>
            <ImUser/>
         </div>
         <div>
            {firstName}  {lastName}
         </div>
        </div>

        <div>
             {/*question */}
             <p>
               {question} 
             </p>
        </div>

        </div>

        <div className='arrow '>
            <span><FaAngleRight/></span>
            {/* arrow */}
        </div>
    </div>
</a>
  )
}

export default Questiona