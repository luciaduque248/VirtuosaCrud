import axios from 'axios';
import React from 'react'
import { apiojos } from '../../../../utils/peticiones';

function EditOjos({ ojo, close }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e.target.producto.value)
    ojo.producto = e.target.producto.value
    ojo.precio = e.target.precio.value
    ojo.descripcion = e.target.descripcion.value
    axios.put(apiojos + ojo.id, ojo)
  }

  const handleClose = () => {
    close(false)
  }

  return (
    <div className='modalEdit'>
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

export default EditOjos