import React from 'react';
import { Link } from 'react-router-dom';
import '../components/assets/css/Login.css'
import Logo from '../components/assets/img/logo 1.svg'
import { Formik } from 'formik';
import Swal from 'sweetalert2';

const Login = () => {
    //admin@gmail.com
    //virtuosa12@
    return (
        <div className='bg-login'>
            <Formik
                initialValues={{
                    email: '',
                    contraseña: ''
                }}
                validate={(valores) => {
                    let errores = {}
                    //VALIDACIÓN CORREO Y CONTRASEÑA DEL ADMIN
                    if(valores.email === 'admin@gmail.com' && valores.contraseña === 'virtuosa12'){
                        window.location = "/admin"
                    }

                    //VALIDACIÓN CORREO
                    if (!valores.email) {
                        errores.email = 'Por favor ingrese su correo electrónico';
                    }else if(!/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(valores.email)){
                        errores.email = "El correo solo puede contener letras, números, puntos, guiones y guion bajo."

                    //VALIDACIÓN CONTRASEÑA
                    }if (!valores.contraseña ) {
                        errores.contraseña = 'Por favor ingrese su contraseña'
                    }else if(!/^.{4,12}$/.test(valores.contraseña)){
                        errores.contraseña = 'La contraseña tiene que ser de 4 a 12 dígitos.'

                    }else{
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'Los datos son incorrectos, revisa bien.'
                          })
                    }
                    return errores;
                }}

                onSubmit={(valores, {resetForm}) => {
                    resetForm();
                    console.log('Formulario enviado')
                }}>

                {({ values, errors, touched, handleSubmit, handleChange, handleBlur }) => (
                    <form action='/' className='formulario-login' onSubmit={handleSubmit}>
                        <img src={Logo} alt="logo" />
                        <h1>Inicia sesión</h1>
                        <p>Introduzca los datos correspondientes</p>
                        <div className='form-login-group'>
                            <label htmlFor='email'>Email</label>
                            <input
                                type='text'
                                id='email'
                                name='email'
                                placeholder='virtuosa@gmail.com'
                                value={values.email}
                                onChange={handleChange}
                                onBlur={handleBlur} />
                                
                                { touched.email && errors.email && <div className='error'>{errors.email}</div>}
                        </div>

                        <div className='form-login-group'>
                            <label htmlFor='contraseña'>Contraseña</label>
                            <input
                                type='text'
                                id='contraseña'
                                name='contraseña'
                                placeholder='Ingrese su contraseña'
                                value={values.contraseña}
                                onChange={handleChange}
                                onBlur={handleBlur} />
                                {touched.contraseña && errors.contraseña && <div className='error'>{errors.contraseña}</div>}
                        </div>

                        <button type='submit'>Iniciar sesión</button>

                        <div className='volver-login'>
                            <button><Link to="/">Volver al inicio</Link></button>
                        </div>
                    </form>
                )}

            </Formik>


        </div>
    );
}

export default Login;