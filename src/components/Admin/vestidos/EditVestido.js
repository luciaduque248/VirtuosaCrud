import axios from 'axios';
import React from 'react'
import { api } from '../../../utils/peticiones';

function EditVestido({ vestido, close }) {
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(e.target.producto.value)
        vestido.producto = e.target.producto.value
        vestido.precio = e.target.precio.value
        vestido.descripcion = e.target.descripcion.value
        //vestido.caracteristicas = e.target.caracteristicas.value.split(",")
        axios.put(api + vestido.id, vestido)
    }

    const handleClose = () =>{
        close(false)
    }

    return (
        <div className='modalEdit'>
            
            <div className='formulario'>
                <div className='cerrar-modal-edit'>
                    <button onClick={handleClose}>X</button>
                </div>
                <h1>Editar producto</h1>

                <form onSubmit={handleSubmit} className='formulario-modal'>
                    <label>Producto</label>
                    <input
                        type="text"
                        placeholder="Ingrese el nombre del producto"
                        name="producto"
                        id='producto' />

                    <label>Precio</label>
                    <input
                        type="number"
                        placeholder="Ingrese el precio del producto"
                        name="precio" 
                        id='precio'/>

                    <label>Descripción</label>
                    <input
                        type="textarea"
                        rows={3}
                        placeholder="Digite la descripción del producto"
                        name="descripcion"
                        id='descripcion' />

                    <div className='botones-editar-modal'>
                        
                        <button type='submit'>Guardar cambios</button>
                    </div>
                    

                </form>
            </div>
        </div>
    )
}

export default EditVestido