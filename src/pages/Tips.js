import React from 'react'
import Home from '../components/home/home'
import '../components/assets/css/Tips.css'
import { Link } from 'react-router-dom'
import Footer from '../components/footer/footer'
import Header from '../components/header/header'

function Tips() {
  return (
    <div>
      <Header />
      <Home />
      <div className='banner-tips'>
        <h1>NUESTROS TIPS</h1>
      </div>
      <div className='contenido-tips-index'>
        <h1>¡Bienvenidos a los tips!</h1>
        <p>Donde encontraras los mejores consejos para cuidar nuestros productos</p>

        <div className='atajos-tips'>
          <div className='atajo-1-tips'>
            <Link to='/VirtuosaCrud/tips/ropa'>
              <img src='https://cdn-icons-png.flaticon.com/512/2290/2290393.png' alt="atajos" className='atajo-img-tips' />
              <p>Tips de Ropa</p>
            </Link>
          </div>

          <div className='atajo-1-tips'>
            <Link to='/VirtuosaCrud/tips/maquillaje'>
              <img src='https://cdn-icons-png.flaticon.com/512/2553/2553580.png' alt="atajos" className='atajo-img-tips' />
              <p>Tips de Maquillaje</p>
            </Link>
          </div>
        </div>
      </div>
    <Footer/>
    </div>
  )
}

export default Tips