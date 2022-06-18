import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Footer from '../../../components/footer/footer'
import Header from '../../../components/header/header';
import Home from '../../../components/home/home'
import { apilabios } from '../../../utils/peticiones'
import './labiosC.css';

function Labios() {

  const [labios, setLabios] = useState([]);
    useEffect(() => {
        axios(apilabios).then(res => {
            console.log(res)
            setLabios(res.data)
        })

    }, [])

  return (
    <div>
      <Header />
      <Home />
      <section className="ban">
        
      </section>

      <div className="contenedor">
                <h1>Labios</h1>
                <div className="container">
                    <div className="boton1">
                        <select name="ocasion" id="ocasion">
                            <option value="0" defaultValue={0}>Ocasion</option>
                            <option value="1">Casual</option>
                            <option value="2">Noche</option>
                            <option value="3">De gala</option>
                            <option value="4">Work</option>
                        </select>
                        <select name="color" id="color">
                            <option value="0" defaultValue={0}>Color</option>
                            <option value="1">Rojo</option>
                            <option value="2">Blanco</option>
                            <option value="3">Negro</option>
                            <option value="4">Morado</option>
                            <option value="5">Lila</option>
                        </select>
                    </div>

                    <div className="boton2">
                        <select name="popularidad" id="popularidad" className="popularidad">
                            <option value="0" defaultValue={0}>Ordenar por </option>
                            <option value="1">Popularidad</option>
                            <option value="2">Precio de menor a mayor</option>
                            <option value="3">Precio de mayor a menor</option>
                            <option value="4">Novedades</option>
                        </select>
                    </div>
                </div>


                <div className="container2">
                    {
                        labios?.map(labio => (
                            <div className="card" key={labio.id}>
                                <div className="venta1">
                                    <a href={"#modal"+labio.id}>
                                        <img src={labio.foto} alt="producto" />
                                    </a>
                                </div>
                                <div className="text-card" id="product1">
                                    <a href={"#modal"+labio.id}>
                                        <h4>{labio.producto}</h4>
                                    </a>
                                    <p>$ {labio.precio}</p>
                                    <div className="select-icon">
                                        <select name="cantidad" id="cantidad">
                                            <option value="0" defaultValue={0}>Cant.</option>
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                            <option value="5">5</option>
                                        </select>
                                        <i className="fa-solid fa-cart-arrow-down"></i>
                                    </div>

                                    <div id={"modal"+ labio.id} className="modal"  >
                                        <a href="#producto1" className="close"> X </a>
                                        <div className="modalContainer" >
                                            <figure className="modalPicture ">
                                              <img src={labio.foto} alt="producto" />
                                            </figure>
                                            <figure className="modalTEXT">
                                                <h2 className="modalTitle">{labio.producto}</h2>
                                                <p className="modalP">{labio.descripcion}
                                                </p>
                                                <div className="select-icon">
                                                    <select name="cantidad" id="cantidad">
                                                        <option value="0" defaultValue={0}>Cant.</option>
                                                        <option value="1">1</option>
                                                        <option value="2">2</option>
                                                        <option value="3">3</option>
                                                        <option value="4">4</option>
                                                        <option value="5">5</option>
                                                    </select>
                                                    <i className="fa-solid fa-cart-arrow-down"></i>
                                                </div>
                                            </figure>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        ))
                    }
                </div>

                <div className="container3">
                    <div className="solo"></div>
                    <div className="botones">
                        <h2 className="bt-1"><a href="./productosRS.html">1</a></h2>
                        <h3 className="bt-2"><a href="./productosRS.html">2</a></h3>
                        <h3 className="bt-3"><a href="./productosRS.html">3</a></h3>
                        <h3 className="bt-4"><a href="./productosRS.html">...</a></h3>
                    </div>
                    <div className="solo2"></div>
                </div>

            </div>
      <Footer />
    </div>
  )
}

export default Labios