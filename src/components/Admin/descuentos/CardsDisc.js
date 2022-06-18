import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { apidiscount } from '../../../utils/peticiones';
import NavbarAdmin from '../navbar/NavbarAdmin';
import EditDST from './EditDST';

function CardsDisc() {
  const [descuentos, setDescuentos] = useState([]);
  useEffect(() => {
    axios(apidiscount).then(res => {
      console.log(res)
      setDescuentos(res.data)
    })

  }, [])


  const [modal, setModal] = useState(false);
  const [descuento, setDescuento] = useState({})


  const handleDelete = (id) => {
    Swal.fire({
      title: '¿Esta seguro que desea eliminar este lugar?',
      text: "No puede revertir esta acción!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, bórralo!'
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`${apidiscount}${id}`).then((response) => {
          console.log(response);
          if (response.status === 200) {
            Swal.fire(
              'Borrado exitosamente!',
              'El lugar seleccionado fue borrado.',
              'success'
            )
          } else {
            Swal.fire(
              'Error',
              'Hubo un problema al borrar el lugar',
              'error'
            )
          } axios.get(apidiscount).then((result) => {
            setDescuentos(result.data)
          })
        })
      }
    })

  }
  return (
    <div>
      <NavbarAdmin />
      <div className='header-admin'>
        <h1>Descuentos</h1>
        <button className='btn btn-white btn-animated'><Link to="/VirtuosaCrud/form-descuentos">Crear un nuevo producto</Link></button>
      </div>



      <div className="container2">
        {
          descuentos?.map(descuento => (
            <div className="card" key={descuento.id}>
              <div className="venta1">
                <img src={descuento.foto} alt="producto" />
              </div>
              <div className="text-card" id="product1">
                <h4>{descuento.producto}</h4>
                <p>$ {descuento.precio}</p>

              </div>
              <div className='botones'>
                <button
                  onClick={() => {
                    setModal(true)
                    setDescuento(descuento)
                  }}
                  className="btn-edit-delete-edit">Editar
                </button>

                <button onClick={() => handleDelete(descuento.id)} className="btn-edit-delete" >Borrar</button>

              </div>


            </div>
          ))
        }
      </div>
      {
        modal ? <EditDST close={setModal} descuento={descuento} /> : null
      }
    </div>
  )
}

export default CardsDisc