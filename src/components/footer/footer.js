import '../header/header.css';
import mapaVirtuosa from './mapa.png';

import React from "react";

function Footer() {
    return (
        <footer>
            <div class="grupo-1">
                <div class="box-footer">
                    <h2>Visítanos</h2>
                    <h4>Cra. 14a #82-27</h4>
                    <a href='https://goo.gl/maps/Ex7GE3LofT1q8U6m8'><img src={mapaVirtuosa} alt='mapa' className='mapa'/></a>
                </div>

                <div class="box-footer">
                    <div class="nosotros-footer">
                        <h2>Nosotros</h2>
                        <p>Acerca de Virtuosa<br />
                            Trabaja con nosotros<br />
                            Contáctanos</p>
                    </div>
                    <div class="informacion-footer">
                        <h2>Información</h2>
                        <p>Centro de ayuda<br />
                            Devoluciones<br />
                            Preguntas frecuentes<br />
                            ¿Como comprar?<br />
                            Guía de tallas<br />
                            Actualiza tus datos<br />
                            Promociones vigentes<br />
                        </p >
                    </div >
                </div >

                <div class="box-footer">
                    <div class="categor">
                        <h2>Categorías</h2>
                        <p>Boutique
                            Maquillaje natural
                        </p>
                    </div >
                    <div class="atajos-footer">
                        <ul>
                            <li><i class="fa-solid fa-clock fa-lg"></i>Rastrea tu orden</li>
                            <li><i class="fa-solid fa-circle-user fa-lg"></i>Mis pedidos</li>
                        </ul>
                    </div >
                </div >

                <div class="box-footer">
                    <div class="suscribete">
                        <h6>SUSCRÍBETE AL NEWSLETTER PARA RECIBIR TODAS LAS NOVEDADES</h6>
                        <button>Suscríbete aquí</button>
                    </div>

                    <div class="red-social" >
                        <i class="fa-brands fa-facebook-f fa-lg"></i>
                        <i class="fa-brands fa-twitter fa-lg"></i>
                        <i class="fa-brands fa-instagram fa-lg"></i>
                        <i class="fa-brands fa-pinterest fa-lg"></i>
                        <i class="fa-brands fa-youtube fa-lg"></i>
                    </div>
                </div>

            </div >

            <div class="grupo-2">
                <small>&copy;2022 <b>Virtuosa S. A.</b> - Todos los Derechos Reservados </small>
            </div>
        </footer >



    );
}


export default Footer;