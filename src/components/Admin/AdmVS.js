import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { api } from '../../utils/peticiones';
import NavbarAdmin from './navbar/NavbarAdmin';
import EditVestido from './vestidos/EditVestido';
import './vestidos/EditVST.css'
import './Responsive.css'

function AdmVS() {
    const [vestidos, setVestidos] = useState([]);
    useEffect(() => {
        axios(api).then(res => {
            console.log(res)
            setVestidos(res.data)
        })

    }, [])


    const [modal, setModal] = useState(false);
    const [vestido, setVestido] = useState({})


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
                axios.delete(`${api}${id}`).then((response) => {
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
                    } axios.get(api).then((result) => {
                        setVestidos(result.data)
                    })
                })
            }
        })

    }

    return (
        <div>
            <NavbarAdmin />
            <div className='header-admin'>
                <h1>Vestidos</h1>
                <button className='btn btn-white btn-animated'><Link to="/VirtuosaCrud/form-vestidos">Crear un nuevo producto</Link></button>
            </div>



            <div className="container2">
                {
                    vestidos?.map(vestido => (
                        <div className="card" key={vestido.id}>
                            <div className="venta1">
                                <img src={vestido.foto} alt="producto" />
                            </div>
                            <div className="text-card" id="product1">
                                <h4>{vestido.producto}</h4>
                                <p>$ {vestido.precio}</p>

                            </div>
                            <div className='botones'>
                                <button
                                    onClick={() => {
                                        setModal(true)
                                        setVestido(vestido)
                                    }}
                                    className="btn-edit-delete-edit">Editar
                                </button>

                                <button onClick={() => handleDelete(vestido.id)} className="btn-edit-delete" >Borrar</button>

                            </div>


                        </div>
                    ))
                }
            </div>
            {
                modal ? <EditVestido close={setModal} vestido={vestido} /> : null
            }
        </div>
    )
}

export default AdmVS