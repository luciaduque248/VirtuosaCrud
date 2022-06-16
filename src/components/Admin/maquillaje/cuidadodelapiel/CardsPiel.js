import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { apipiel } from '../../../../utils/peticiones';
import BtnMakeup from '../../btn-makeup/BtnMakeup';
import NavbarAdmin from '../../navbar/NavbarAdmin';
import EditPiel from './EditPiel';

function CardsPiel() {
  const [pieles, setPieles] = useState([]);
  useEffect(() => {
    axios(apipiel).then(res => {
      console.log(res)
      setPieles(res.data)
    })

  }, [])


  const [modal, setModal] = useState(false);
  const [piel, setPiel] = useState({})


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
        axios.delete(`${apipiel}${id}`).then((response) => {
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
          } axios.get(apipiel).then((result) => {
            setPieles(result.data)
          })
        })
      }
    })

  }

  return (
    <div>
      <NavbarAdmin />
      <div className='header-admin'>
        <h1>Cuidado de la piel</h1>
        <BtnMakeup/>
        <button className='btn btn-white btn-animated'><Link to="/VirtuosaCrud/form-cuidadodelapiel">Crear un nuevo producto</Link></button>
      </div>



      <div className="container2">
        {
          pieles?.map(piel => (
            <div className="card" key={piel.id}>
              <div className="venta1">
                <img src={piel.foto} alt="producto" />
              </div>
              <div className="text-card" id="product1">
                <h4>{piel.producto}</h4>
                <p>$ {piel.precio}</p>

              </div>
              <div className='botones'>
                <button
                  onClick={() => {
                    setModal(true)
                    setPiel(piel)
                  }}
                  className="btn-edit-delete-edit">Editar
                </button>

                <button onClick={() => handleDelete(piel.id)} className="btn-edit-delete" >Borrar</button>

              </div>


            </div>
          ))
        }
      </div>
      {
        modal ? <EditPiel close={setModal} piel={piel} /> : null
      }
    </div>
  )
}

export default CardsPiel