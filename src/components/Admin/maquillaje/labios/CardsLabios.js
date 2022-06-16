import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { apilabios } from '../../../../utils/peticiones';
import BtnMakeup from '../../btn-makeup/BtnMakeup';
import NavbarAdmin from '../../navbar/NavbarAdmin';
import EditLabios from './EditLabios';

function CardsLabios() {
  const [labios, setLabios] = useState([]);
  useEffect(() => {
      axios(apilabios).then(res => {
          console.log(res)
          setLabios(res.data)
      })

  }, [])


  const [modal, setModal] = useState(false);
  const [labio, setLabio] = useState({})


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
              axios.delete(`${apilabios}${id}`).then((response) => {
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
                  } axios.get(apilabios).then((result) => {
                      setLabios(result.data)
                  })
              })
          }
      })

  }
  return (
    <div>
      <NavbarAdmin />
      <div className='header-admin'>
        <h1>Labios</h1>
        <BtnMakeup/>
        <button className='btn btn-white btn-animated'><Link to="/VirtuosaCrud/form-labios">Crear un nuevo producto</Link></button>
      </div>



      <div className="container2">
        {
          labios?.map(labio => (
            <div className="card" key={labio.id}>
              <div className="venta1">
                <img src={labio.foto} alt="producto" />
              </div>
              <div className="text-card" id="product1">
                <h4>{labio.producto}</h4>
                <p>$ {labio.precio}</p>

              </div>
              <div className='botones'>
                <button
                  onClick={() => {
                    setModal(true)
                    setLabio(labio)
                  }}
                  className="btn-edit-delete-edit">Editar
                </button>

                <button onClick={() => handleDelete(labio.id)} className="btn-edit-delete" >Borrar</button>

              </div>


            </div>
          ))
        }
      </div>
      {
        modal ? <EditLabios close={setModal} labio={labio} /> : null
      }
    </div>
  )
}

export default CardsLabios