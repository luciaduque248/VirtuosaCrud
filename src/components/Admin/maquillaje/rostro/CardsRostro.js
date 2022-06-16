import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { apirostro } from '../../../../utils/peticiones';
import BtnMakeup from '../../btn-makeup/BtnMakeup';
import NavbarAdmin from '../../navbar/NavbarAdmin';
import EditRostro from './EditRostro'

function CardsRostro() {
    const [rostros, setRostros] = useState([]);
    useEffect(() => {
        axios(apirostro).then(res => {
            console.log(res)
            setRostros(res.data)
        })

    }, [])


    const [modal, setModal] = useState(false);
    const [rostro, setRostro] = useState({})


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
                axios.delete(`${apirostro}${id}`).then((response) => {
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
                    } axios.get(apirostro).then((result) => {
                        setRostros(result.data)
                    })
                })
            }
        })

    }

    return (
        <div>
            <NavbarAdmin />
            <div className='header-admin'>
                <h1>Rostro</h1>
                <BtnMakeup/>
                <button className='btn btn-white btn-animated'><Link to="/VirtuosaCrud/form-rostro">Crear un nuevo producto</Link></button>
            </div>



            <div className="container2">
                {
                    rostros?.map(rostro => (
                        <div className="card" key={rostro.id}>
                            <div className="venta1">
                                <img src={rostro.foto} alt="producto" />
                            </div>
                            <div className="text-card" id="product1">
                                <h4>{rostro.producto}</h4>
                                <p>$ {rostro.precio}</p>

                            </div>
                            <div className='botones'>
                                <button
                                    onClick={() => {
                                        setModal(true)
                                        setRostro(rostro)
                                    }}
                                    className="btn-edit-delete-edit">Editar
                                </button>

                                <button onClick={() => handleDelete(rostro.id)} className="btn-edit-delete" >Borrar</button>

                            </div>


                        </div>
                    ))
                }
            </div>
            {
                modal ? <EditRostro close={setModal} rostro={rostro} /> : null
            }
        </div>
    )
}

export default CardsRostro