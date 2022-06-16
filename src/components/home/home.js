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
                    <Link to="/" className="active item">
                    INICIO</Link>
                </li>
                <li>
                    <a href="/maquillaje" className="item">MAQUILLAJE <i className="fa-solid fa-angle-down"></i></a>
                    <ul className="submenu">
                        <li><a href="/rostro">Rostro</a></li>
                        <li><a href="/ojos">Ojos</a></li>
                        <li><a href="/piel">Piel</a></li>
                        <li><a href="/labios">Labios</a></li>
                    </ul>
                </li>
                <li>
                    <a href="/moda" className="item">MODA <i className="fa-solid fa-angle-down"></i></a>
                    <ul className="submenu">
                        <li><a href="/moda-vestidos">Vestidos</a></li>
                        <li><a href="/moda-diseña">Diseña tu look</a></li>
                        <li><a href="/moda-tendencias">Novedades</a></li>
                        <li><a href="/moda-descuentos">Promociones</a></li>
                    </ul>
                </li>
                <li>
                    <a href="/tips" className="item">TIPS <i className="fa-solid fa-angle-down"></i></a>
                    <ul className="submenu">
                        <li><a href="*">Tips Maquillaje</a></li>
                        <li><a href="*">Tips Ropa</a></li>
                    </ul>
                </li>

            </ul>
            <Link to="/">

            <div className="logo"><img src={logoVirtuosa} alt="logo" /></div></Link>
            
            <ul className="nav-menu">

                <li><a href="/experiencias" className="item">EXPERIENCIAS</a></li>
                <li><a href="/nosotros" className="item">NOSOTROS</a></li>
                <li><a href="/contacto" className="item">CONTACTO</a></li>

            </ul>
        </nav>
    );
}

export default Home;

