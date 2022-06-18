import axios from 'axios';
import React from 'react'
import { apilabios } from '../../../../utils/peticiones';

function EditLabios({ labio, close }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e.target.producto.value)
    labio.producto = e.target.producto.value
    labio.precio = e.target.precio.value
    labio.descripcion = e.target.descripcion.value
    axios.put(apilabios + labio.id, labio)
  }

  const handleClose = () => {
    close(false)
  }
  return (
    <div className='modalEdit' >
      <div className='formulario'>
        <h1>Editar producto de maquillaje</h1>

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
            id='precio' />

          <label>Descripción</label>
          <input
            type="textarea"
            rows={3}
            placeholder="Digite la descripción del producto"
            name="descripción"
            id='descripción' />

          <div className='botones-editar-modal'>
            <button onClick={handleClose}>Cerrar</button>
            <button type='submit'>Guardar cambios</button>
          </div>

        </form>
      </div>
    </div>
  )
}

export default EditLabios