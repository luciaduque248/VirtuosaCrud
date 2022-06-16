import axios from 'axios';
import React from 'react'
import { apirostro } from '../../../../utils/peticiones';

function EditRostro({ rostro, close }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e.target.producto.value)
    rostro.producto = e.target.producto.value
    rostro.precio = e.target.precio.value
    rostro.descripcion = e.target.descripcion.value
    axios.put(apirostro + rostro.id, rostro)
  }

  const handleClose = () => {
    close(false)
  }

  return (
    <div className='modalEdit'>
      <div className='formulario'>
        <h1>Editar producto de maquillaje</h1>

        <form onSubmit={handleSubmit}>
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

          <button onClick={handleClose}>Cerrar</button>
          <button type='submit'>Guardar cambios</button>

        </form>
      </div>
    </div>
  )
}

export default EditRostro;