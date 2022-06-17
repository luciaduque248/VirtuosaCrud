import React from "react";
import logoVirtuosa from '../assets/img/logo 1.svg';
import { Link } from 'react-router-dom';

function Home() {
    return (
        <nav>
            <input type="checkbox" name="check" id="chk-menu" />
            <label htmlFor="chk-menu" className=" btn-menu"><i className="fas fa-bars"></i></label>

            <ul className="nav-menu">
                <li>
                    <Link to="/VirtuosaCrud" className="active item">
                    INICIO</Link>
                </li>
                <li>
                    <a href="/VirtuosaCrud/maquillaje" className="item">MAQUILLAJE <i className="fa-solid fa-angle-down"></i></a>
                    <ul className="submenu">
                        <li><a href="/VirtuosaCrud/rostro">Rostro</a></li>
                        <li><a href="/VirtuosaCrud/ojos">Ojos</a></li>
                        <li><a href="/VirtuosaCrud/piel">Piel</a></li>
                        <li><a href="/VirtuosaCrud/labios">Labios</a></li>
                    </ul>
                </li>
                <li>
                    <a href="/moda/" className="item">MODA <i className="fa-solid fa-angle-down"></i></a>
                    <ul className="submenu">
                        <li><a href="/VirtuosaCrud/moda-vestidos">Vestidos</a></li>
                        <li><a href="/VirtuosaCrud/moda-diseña">Diseña tu look</a></li>
                        <li><a href="/VirtuosaCrud/moda-tendencias">Novedades</a></li>
                        <li><a href="/VirtuosaCrud/moda-descuentos">Promociones</a></li>
                    </ul>
                </li>
                <li>
                    <a href="/VirtuosaCrud/tips" className="item">TIPS <i className="fa-solid fa-angle-down"></i></a>
                    <ul className="submenu">
                        <li><a href="*">Tips Maquillaje</a></li>
                        <li><a href="*">Tips Ropa</a></li>
                    </ul>
                </li>

            </ul>
            <Link to="/VirtuosaCrud">
                <div className="logo">
                    <img src={logoVirtuosa} alt="logo" />
                </div>
            </Link>
            
            <ul className="nav-menu">

                <li><a href="/VirtuosaCrud/experiencias" className="item">EXPERIENCIAS</a></li>
                <li><a href="/VirtuosaCrud/nosotros" className="item">NOSOTROS</a></li>
                <li><a href="/VirtuosaCrud/contacto" className="item">CONTACTO</a></li>

            </ul>
        </nav>
    );
}

export default Home;

