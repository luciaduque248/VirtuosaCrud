import '../header/header.css';
import mapaVirtuosa from './mapa.png';

import React from "react";

function Footer() {
    return (
        <footer>
            <div className="grupo-1">
                <div className="box">
                    <h2>Visitanos</h2>
                    <h4>Cra. 14a #82-27</h4>
                    <a href='https://goo.gl/maps/Ex7GE3LofT1q8U6m8'><img src={mapaVirtuosa} alt='mapa' className='mapa'/></a>
                </div>

                <div className="box">
                    <div className="nosotros">
                        <h2>Nosotros</h2>
                        <p>Acerca de Virtuosa<br />
                            Trabaja con nosotros<br />
                            Contáctanos</p>
                    </div>
                    <div className="informacion">
                        <h2>Información</h2>
                        <p>Centro de ayuda<br />
                            Devoluciones<br />
                            Preguntas frecuentes<br />
                            ¿Como comprar?<br />
                            Guia de tallas<br />
                            Actualiza tus datos<br />
                            Promociones vigentes<br />
                        </p >
                    </div >
                </div >

                <div className="box">
                    <div className="categor">
                        <h2>Categorias</h2>
                        <p>Boutique
                            Maquillaje natural
                        </p>
                    </div >
                    <div className="atajos">
                        <ul>
                            <li><i className="fa-solid fa-clock fa-lg"></i>Rastrea tu orden</li>
                            <li><i className="fa-solid fa-circle-user fa-lg"></i>Mis pedidos</li>
                        </ul>
                    </div >
                </div >

                <div className="box">
                    <div className="suscribete">
                        <h6>SUSCRIBETE AL NEWSLETTER PARA RECIBIR TODAS LAS NOVEDADES</h6>
                        <button>Suscribete aqui</button>
                    </div>

                    <div className="red-social" >
                        <i className="fa-brands fa-facebook-f fa-lg"></i>
                        <i className="fa-brands fa-twitter fa-lg"></i>
                        <i className="fa-brands fa-instagram fa-lg"></i>
                        <i className="fa-brands fa-pinterest fa-lg"></i>
                        <i className="fa-brands fa-youtube fa-lg"></i>
                    </div>
                </div>

            </div >

            <div className="grupo-2">
                <small>&copy;2022 <b>Virtuosa S. A.</b> - Todos los Derechos Reservados </small>
            </div>
        </footer >

    );
}


export default Footer;