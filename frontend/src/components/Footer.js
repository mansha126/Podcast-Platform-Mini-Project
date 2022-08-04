import React from 'react'
import "./Footer.css"

const Footer = () => {
  return (
    <footer className="text-center text-white" style={{backgroundColor:"black"}}>
  
      <div className="container-con p-4 pb-0">
    
        <section className="mb-4">
    
          <a className="btnm btn-outline-light btn-floating m-1" href="#!" role="button"
          ><i className="fab fa-facebook-f"></i
          ></a>

  
          <a className="btnm btn-outline-light btn-floating m-1" href="#!" role="button"
          ><i className="fab fa-twitter"></i
          ></a>

    
          <a className="btnm btn-outline-light btn-floating m-1" href="#!" role="button"
          ><i className="fab fa-google"></i
          ></a>

      
          <a className="btnm btn-outline-light btn-floating m-1" href="#!" role="button"
          ><i className="fab fa-instagram"></i
          ></a>

      
          <a className="btnm btn-outline-light btn-floating m-1" href="#!" role="button"
          ><i className="fab fa-linkedin-in"></i
          ></a>

  
          <a className="btnm btn-outline-light btn-floating m-1" href="#!" role="button"
          ><i className="fab fa-github"></i
          ></a>
        </section>

      </div>
  
      <div className="text-center p-3" >
        © 2022 Copyright:
        <a className="text-white" href="https://mdbootstrap.com/">All rights reserved.</a>
      </div>
  
    </footer>
  )
};

export default Footer;