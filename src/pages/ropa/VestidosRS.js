import NoAlert from '../../components/header/NoAlert';
import Footer from '../../components/footer/footer';
import Home from '../../components/home/home';  // nav bar

import '../../../src/components/assets/css/Vestidos.css';

import { useEffect, useState } from 'react';
import axios from 'axios';
import SliderCarousel from '../../components/carousel/ropa/vestidos/Slider';
import { api } from '../../utils/peticiones';
import uuid from 'react-uuid';

function Vestidos() {
    const [vestidos, setVestidos] = useState([]);
    useEffect(() => {
        axios(api).then(res => {
            console.log(res)
            setVestidos(res.data)
        })

    }, [])

    return (
        <div>
            <NoAlert />
            <Home />
            <section className="viste-a-la-moda">
                <h1>VISTE A LA MODA</h1>
            </section>

            <div className="contenedor">
                <h1>Vestidos</h1>
                <div className="container">
                    <div className="boton1">
                        <select name="corte" id="corte">
                            <option value="0" defaultValue={0}>Corte</option>
                            <option value="1">Corto</option>
                            <option value="2">Semicorto</option>
                            <option value="3">Largo</option>
                        </select>
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
                        <select name="ocasion" id="ocasion">
                            <option value="0" defaultValue={0}>Ocasion</option>
                            <option value="1">Casual</option>
                            <option value="2">Noche</option>
                            <option value="3">Vestido de gala</option>
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
                        vestidos?.map(vestido => (
                            <div className="card" key={vestido.id}>
                                <div className="venta1">
                                    <a href={"#modal"+vestido.id}>
                                        <img src={vestido.foto} alt="producto" />
                                    </a>
                                </div>
                                <div className="text-card" id="product1">
                                    <a href={"#modal"+vestido.id}>
                                        <h4>{vestido.producto}</h4>
                                    </a>
                                    <p>$ {vestido.precio}</p>
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

                                    <div id={"modal"+ vestido.id} className="modal"  >
                                        <a href="#producto1" className="close"> X </a>
                                        <div className="modalContainer" >
                                            <figure className="modalPicture ">
                                                <SliderCarousel carousel={vestido.slider} />
                                            </figure>
                                            <figure className="modalTEXT">
                                                <h2 className="modalTitle">{vestido.producto}</h2>
                                                <p className="modalP">{vestido.descripcion}
                                                </p>
                                                <div className="charact">
                                                    <ul>
                                                        {vestido.caracteristicas?.map(caracteristica=>(
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

    );
}

export default Vestidos;