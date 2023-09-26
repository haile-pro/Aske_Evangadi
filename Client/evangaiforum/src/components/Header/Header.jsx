import React, { useContext } from 'react'
import logo from "../../assets/evangadi-logo.png"
import { AuthContext } from '../Authv1/AuthConetxt'


function Header() {
const {logout,state}=useContext(AuthContext);

  return (
    <section>
        <nav className="navbar p-3  navbar-expand-lg ">
    <div className="container">
      <a className="navbar-brand" href="#">
     <img src={logo} alt="" />
     </a>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse justify-content-end fw-semibold" id="navbarNav">
        <ul className="navbar-nav ">
          <li className="nav-item align-items-center d-flex">
            <a className="nav-link active" aria-current="page" href="#">Home</a>
          </li>
          <li className="nav-item align-items-center d-flex">
            <a className="nav-link" href="#">
               How It Works
               
                </a>
          </li>
          <li className="nav-item align-items-center">
            <a className="nav-link" href="#">

              {state.isAuthenticated?(
              <button onClick={()=>logout()} className="btn btn-primary fw-bold px-5   action-btn">SIGN OUT</button>): (<button onClick={()=>logout()} className="btn btn-primary fw-bold px-5   action-btn">SIGN IN</button>)}

             
              </a>
          </li>
          
        </ul>
      </div>
    </div>
  </nav>
  </section>
  )
}

export default Header
