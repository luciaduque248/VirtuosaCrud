import React from 'react';
import { Link } from 'react-router-dom';
import NavbarAdmin from './navbar/NavbarAdmin'
import './Responsive.css'

function InicioAdmin() {
  return (
    <div>
        <NavbarAdmin/>
        <div className='admin-home'>
            <div className='texto-home'>
                <h1>¡Bienvenido, Administrador!</h1>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."</p>
                <div className='botones-home'>
                    <button>Actualizar datos</button>
                    <button><Link to="/login">Salir</Link></button>
                </div>
                
            </div>
            
        </div>
    </div>
  )
}

export default InicioAdmin