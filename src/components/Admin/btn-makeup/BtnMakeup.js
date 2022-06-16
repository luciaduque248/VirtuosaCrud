import React from 'react'
import { Link } from 'react-router-dom'
import './Btn.css'
import '../Responsive.css'

function BtnMakeup() {
  return (
    <div>
        <div className='btn-header-makeup'>
            <Link to="/edit-ojos"><button className='btns-atajos-makeup'>Ojos</button></Link>
            <Link to="/edit-rostro"><button className='btns-atajos-makeup'>Rostro</button></Link>
            <Link to="/edit-labios"><button className='btns-atajos-makeup'>Labios</button></Link>
            <Link to="/edit-cuidadodelapiel"><button className='btns-atajos-makeup btn-piel'>Cuidado de la piel</button></Link>
        </div>
    </div>
  )
}

export default BtnMakeup