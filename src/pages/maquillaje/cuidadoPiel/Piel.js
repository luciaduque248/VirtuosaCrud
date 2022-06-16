import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Footer from '../../../components/footer/footer'
import NoAlert from '../../../components/header/NoAlert'
import Home from '../../../components/home/home'
import { apipiel } from '../../../utils/peticiones';
import './cuidadoPiel.css'

function Piel() {
  const [pieles, setPiel] = useState([]);
  useEffect(() => {
    axios(apipiel).then(res => {
      console.log(res)
      setPiel(res.data)
    })

  }, [])
  return (
    <div>
      <NoAlert />
      <Home />
      <div class="banner-piel"></div>

      <div className="contenedor">
        <h1>Cuidado de la Piel</h1>
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
            pieles?.map(piel => (
              <div className="card" key={piel.id}>
                <div className="venta1">
                  <a href={"#modal" + piel.id}>
                    <img src={piel.foto} alt="producto" />
                  </a>
                </div>
                <div className="text-card" id="product1">
                  <a href={"#modal" + piel.id}>
                    <h4>{piel.producto}</h4>
                  </a>
                  <p>$ {piel.precio}</p>
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

                  <div id={"modal" + piel.id} className="modal"  >
                    <a href="#producto1" className="close"> X </a>
                    <div className="modalContainer" >
                      <figure className="modalPicture ">
                        <img src={piel.foto} alt="producto" />
                      </figure>
                      <figure className="modalTEXT">
                        <h2 className="modalTitle">{piel.producto}</h2>
                        <p className="modalP">{piel.descripcion}
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

export default Piel