import React from 'react'
import { Link } from 'react-router-dom'
import Logo from "../../assets/img/logo.svg"
import '../vestidos/EditVST.css'
import '../Responsive.css'
function NavbarAdmin() {
  return (
    <div>
      <div className='nav-bar-admin'>
        <div className='logo-admin'>
          <img src={Logo} alt='logo' />
          <div className='profile'>
            <i className="fa-solid fa-circle-user"></i>
            <h3>Admin</h3>
          </div>
        </div>
        <div className='atajos'>
          <Link to="/admin" className='atajos-responsive'>
            <i className="fa-solid fa-house"></i>
            Inicio</Link>
          <Link to="/edit-vestidos" className='atajos-responsive'>
            <i className="fa-solid fa-pen-to-square"></i>
            Editar Vestidos</Link>
          <Link to="/edit-descuentos" className='atajos-responsive'>
            <i className="fa-solid fa-pen-to-square"></i>
            Editar Descuentos</Link>

          <Link to="/edit-maquillaje" className='atajos-responsive'>
            <i className="fa-solid fa-pen-to-square"></i>
            Editar Maquillaje</Link>

          <Link to="/login" className='salir atajos-responsive'>
            <i className="fa-solid fa-arrow-right-from-bracket"></i>
            Salir
          </Link>


        </div>
      </div>
    </div>
  )
}

export default NavbarAdmin