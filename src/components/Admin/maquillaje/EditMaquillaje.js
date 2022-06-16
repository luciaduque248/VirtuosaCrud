import React from 'react'
import { Link } from 'react-router-dom'
import NavbarAdmin from '../navbar/NavbarAdmin'
import './EditMakeUp.css'

function EditMaquillaje() {
    return (
        <div>
            <NavbarAdmin />
            <div className='editar-maquillaje'>
                <div className='menu-edit-makeup'>
                    <h1>Edita los productos de maquillaje</h1>
                    <p>Selecciona el ítem que deseas editar</p>
                    <button className='button-edit-makeup'><Link to="/VirtuosaCrud/edit-ojos">
                        <i className="fa-solid fa-pen-to-square"></i>
                        Editar Ojos</Link></button>
                    <button className='button-edit-makeup'><Link to="/VirtuosaCrud/edit-rostro">
                        <i className="fa-solid fa-pen-to-square"></i>
                        Editar Rostro</Link></button>
                    <button className='button-edit-makeup'><Link to="/VirtuosaCrud/edit-labios">
                        <i className="fa-solid fa-pen-to-square"></i>
                        Editar Labios</Link></button>
                    <button className='button-edit-makeup'><Link to="/VirtuosaCrud/edit-cuidadodelapiel">
                        <i className="fa-solid fa-pen-to-square"></i>
                        Editar Cuidado de la piel</Link></button>
                </div>
                
            </div>

        </div>
    )
}

export default EditMaquillaje