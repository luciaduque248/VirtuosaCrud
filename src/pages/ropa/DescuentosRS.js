
import Footer from '../../components/footer/footer';
import Home from '../../components/home/home';  // nav bar

import '../../../src/components/assets/css/Descuentos.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { apidiscount } from '../../utils/peticiones';
import uuid from 'react-uuid';
import SliderCarouselDisc from '../../components/carousel/ropa/descuentos/SliderDisc';
import Header from '../../components/header/header';


function Descuentos() {
    const [descuentos, setDescuentos] = useState([]);
    useEffect(() => {
        axios(apidiscount).then(res => {
            console.log(res)
            setDescuentos(res.data)
        })

    }, [])

    return (
        <div>
            <Header/>
            <Home />
            <section class="banner-descuentos">
                <h1>SALES</h1>
            </section>

            <div class="contenedor-descuentos">
                <h1>Descuentos</h1>
                <div class="container-descuentos">
                    <div class="boton1">
                        <select name="corte" id="corte">
                            <option value="0" selected>Corte</option>
                            <option value="1">Corto</option>
                            <option value="2">Semicorto</option>
                            <option value="3">Largo</option>
                        </select>
                        <select name="talla" id="talla">
                            <option value="0" selected>Talla</option>
                            <option value="1">XXS</option>
                            <option value="2">XS</option>
                            <option value="3">S</option>
                            <option value="4">M</option>
                            <option value="5">L</option>
                            <option value="6">XL</option>
                            <option value="7">XXL</option>
                        </select>
                        <select name="ocasion" id="ocasion">
                            <option value="0" selected>Ocasion</option>
                            <option value="1">Casual</option>
                            <option value="2">Noche</option>
                            <option value="3">Vestido de gala</option>
                            <option value="4">Work</option>
                        </select>
                        <select name="color" id="color">
                            <option value="0" selected>Color</option>
                            <option value="1">Rojo</option>
                            <option value="2">Blanco</option>
                            <option value="3">Negro</option>
                            <option value="4">Morado</option>
                            <option value="5">Lila</option>
                        </select>
                    </div>

                    <div class="boton2">
                        <select name="popularidad" id="popularidad" class="popularidad">
                            <option value="0" selected>Ordenar por </option>
                            <option value="1">Popularidad</option>
                            <option value="2">Precio de menor a mayor</option>
                            <option value="3">Precio de mayor a menor</option>
                            <option value="4">Novedades</option>
                        </select>
                    </div>
                </div>

                <div className="container2">
                    {
                        descuentos?.map(descuento => (
                            <div className="card" key={descuento.id}>
                                <div className="venta1">
                                    <a href="#modal">
                                        <img src={descuento.foto} alt="producto" />
                                    </a>
                                </div>
                                <div className="text-card" id="product1">
                                    <a href="#modal">
                                        <h4>{descuento.producto}</h4>
                                    </a>
                                    <p>$ {descuento.precio}</p>
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

                                    <div id="modal" className="modal">
                                        <a href="#producto1" className="close"> X </a>
                                        <div className="modalContainer">
                                            <figure className="modalPicture ">
                                                <SliderCarouselDisc carousel={descuento.slider} />
                                            </figure>
                                            <figure className="modalTEXT">
                                                <h2 className="modalTitle">{descuento.producto}</h2>
                                                <p className="modalP">{descuento.descripcion}
                                                </p>
                                                <div className="charact">
                                                    <ul>
                                                        {descuento.caracteristicas?.map(caracteristica=>(
                                                            <li key={uuid()}>{caracteristica}</li>
                                                        ))}
                                                    </ul>
                                                </div>
                                                <div className="select-icon">
                                                    <select name="talla" id="talla">
                                                        <option value="0" defaultValue={0}>Talla</option>
                                                        <option value="1">XXS</option>
                                                        <option value="2">XS</option>
                                                        <option value="3">S</option>
                                                        <option value="4">M</option>
                                                        <option value="5">L</option>
                                                        <option value="6">XL</option>
                                                        <option value="7">XXL</option>
                                                    </select>
                                                    <select name="cantidad" id="cantidad">
                                                        <option value="0" defaultValue={0}>Cant.</option>
                                                        <option value="1">1</option>
                                                        <option value="2">2</option>
                                                        <option value="3">3</option>
                                                        <option value="4">4</option>
                                                        <option value="5">5</option>
                                                    </select>
                                                    <button><i className="fa-solid fa-cart-arrow-down"></i></button>
                                                </div>
                                            </figure>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>

            <Footer />
        </div>

    );
}

export default Descuentos;