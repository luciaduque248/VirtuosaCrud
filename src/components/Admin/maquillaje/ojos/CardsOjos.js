import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { apiojos } from '../../../../utils/peticiones';
import BtnMakeup from '../../btn-makeup/BtnMakeup';
import NavbarAdmin from '../../navbar/NavbarAdmin';
import EditOjos from './EditOjos'

function CardsOjos() {
    const [ojos, setOjos] = useState([]);
    useEffect(() => {
        axios(apiojos).then(res => {
            console.log(res)
            setOjos(res.data)
        })

    }, [])


    const [modal, setModal] = useState(false);
    const [ojo, setOjo] = useState({})


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
                axios.delete(`${apiojos}${id}`).then((response) => {
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
                    } axios.get(apiojos).then((result) => {
                        setOjos(result.data)
                    })
                })
            }
        })

    }
    return (
        <div>
            <NavbarAdmin />
            <div className='header-admin'>
                <h1>Ojos</h1>
                <BtnMakeup/>
                <button className='btn btn-white btn-animated'><Link to="/form-ojos">Crear un nuevo producto</Link></button>
            </div>


            <div className="container2">
                {
                    ojos?.map(ojo => (
                        <div className="card" key={ojo.id}>
                            <div className="venta1">
                                <img src={ojo.foto} alt="producto" />
                            </div>
                            <div className="text-card" id="product1">
                                <h4>{ojo.producto}</h4>
                                <p>$ {ojo.precio}</p>

                            </div>
                            <div className='botones'>
                                <button
                                    onClick={() => {
                                        setModal(true)
                                        setOjo(ojo)
                                    }}
                                    className="btn-edit-delete-edit">Editar
                                </button>

                                <button onClick={() => handleDelete(ojo.id)} className="btn-edit-delete" >Borrar</button>

                            </div>


                        </div>
                    ))
                }
            </div>
            {
                modal ? <EditOjos close={setModal} ojo={ojo} /> : null
            }
        </div>
    )
}

export default CardsOjos;