import React from 'react'
import SlideMakeUp from './Slides/SlideMakeUp'
import './Maquillaje.css'
import { Link } from 'react-router-dom'

function Makeup() {
    return (
        <div className='makeup'>

            <SlideMakeUp />

            <div className='contenido-makeup'>
                <h1>¡Bienvenidos al cuidado personal!</h1>
                <p>Escoge tus productos favoritos de acuerdo a tu búsqueda</p>

                <div className='atajos-makeup'>
                    <div className='atajo-1'>
                        <Link to='/ojos'>
                            <img src='https://cdn-icons-png.flaticon.com/512/82/82832.png' alt="atajos" className='atajo-ojos' />
                            Ojos
                        </Link>
                    </div>

                    <div className='atajo-1'>
                        <Link to='/labios'>
                            <img src='https://cdn-icons-png.flaticon.com/512/1024/1024505.png' alt="atajos" className='atajo-ojos' />
                            Labios
                        </Link>
                    </div>

                    <div className='atajo-1'>
                        <Link to='/piel'>
                            <img src='https://cdn-icons-png.flaticon.com/512/1207/1207069.png' alt="atajos" className='atajo-ojos' />
                            Piel
                        </Link>
                    </div>

                    <div className='atajo-1'>
                        <Link to='/rostro'>
                            <img src='https://cdn-icons-png.flaticon.com/512/5731/5731856.png' alt="atajos" className='atajo-ojos' />
                            Rostro
                        </Link>
                    </div>

                </div>
            </div>

        </div>
    )
}

export default Makeup