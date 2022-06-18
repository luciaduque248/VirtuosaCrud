import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { apiojos } from '../../../../utils/peticiones';
import NavbarAdmin from '../../navbar/NavbarAdmin';

function FormOjos() {
    const history = useNavigate();

    /*1.Inicializamos los inputs en el estado, para poder recibir los valores que se digiten 
    en él y controlarlos */
    const [data, setData] = useState({
        id: "",
        producto: "",
        precio: "",
        foto: "",
        descripcion: ""
    })
    /*2. Se usa la función handleChange para que cada vez que haya un cambio en el input
    guarde el name y el value del mismo */
    const handleChange = ({ target }) => {
        //Cada vez que haya un cambio se va a guardar el valor en el estado data
        setData({
            ...data,
            [target.name]: target.value
        })
    }

    /*3. función para procesar el envío del formulario*/
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await axios.post(apiojos, data);//await espera hasta que se ejecute la petición
        //console.log(response);
        if (response.status === 201) {

            Swal.fire(
                'Guardado!',
                `El producto <strong> ${response.data.producto}</strong> ha sido guardado exitosamente!`,
                'success'
            )
            history.push("/");

        } else {
            Swal.fire(
                'Error!',
                'Hubo un problema al registrar el producto!',
                'error'
            )
        }
    }
    return (
        <>
            <NavbarAdmin />
            <div className='form-nuevo-vestido'>
                <h1 className='text-center'>Datos de un nuevo producto</h1>
                <div>
                    <form onSubmit={handleSubmit} >
                        <div className="form-group">
                            <label>Producto</label>
                            <input
                                type="text"
                                placeholder="Ingrese el nombre del producto"
                                name="producto"
                                value={data.producto}
                                onChange={handleChange}
                                className="inputs" ></input>

                        </div>

                        <div className="form-group">
                            <label>Precio</label>
                            <input
                                type="text"
                                placeholder="Ingrese el precio del producto"
                                name="precio"
                                value={data.precio}
                                onChange={handleChange}
                                className="inputs"></input>
                        </div>

                        <div className="form-group">
                            <label>Imagen</label>
                            <input
                                type="text"
                                placeholder="Ingrese el link de la imagen"
                                name="foto"
                                value={data.foto}
                                onChange={handleChange}
                                className="inputs" />
                        </div>

                        <div className="form-group">
                            <label>Descripción</label>
                            <input
                                as="textarea"
                                rows={3}
                                placeholder="Ingrese la descripción del producto"
                                name="descripción"
                                value={data.descripcion}
                                onChange={handleChange}
                                className="inputs"></input>
                        </div>

                        <div className='btn-form-vestido'>
                            <button className='guardar-form'>Guardar</button>
                            <button className='volver-form'><Link to="/VirtuosaCrud/edit-ojos" className="volver">Volver</Link></button>
                        </div>

                    </form>
                </div>
            </div>

        </>
    )
}

export default FormOjos