import React from "react";
import logoVirtuosa from '../assets/img/logo 1.svg';
import { Link } from 'react-router-dom';
import '../header/header.css'

function Home() {
    return (
        <nav>
            <input type="checkbox" name="check" id="chk-menu" />
            <label htmlFor="chk-menu" className=" btn-menu"><i className="fas fa-bars"></i></label>

            <div className="espacio"></div>
            
            <ul className="nav-menu" id="nav-menuxd1">
                <li>
                    <Link to="/VirtuosaCrud" className="active item">
                        INICIO</Link>
                </li>
                <li>
                    <Link to="/VirtuosaCrud/maquillaje" className="item angle-symbol">MAQUILLAJE <i className="fa-solid fa-angle-down"></i></Link>
                    <ul className="submenu">
                        <li><Link to="/VirtuosaCrud/rostro">Rostro</Link></li>
                        <li><Link to="/VirtuosaCrud/ojos">Ojos</Link></li>
                        <li><Link to="/VirtuosaCrud/piel">Piel</Link></li>
                        <li><Link to="/VirtuosaCrud/labios">Labios</Link></li>
                    </ul>
                </li>
                <li>
                    <Link to="/VirtuosaCrud/moda" className="item angle-symbol">MODA <i className="fa-solid fa-angle-down"></i></Link>
                    <ul className="submenu">
                        <li><Link to="/VirtuosaCrud/moda-vestidos">Vestidos</Link></li>
                        <li><Link to="/VirtuosaCrud/moda-tendencias">Novedades</Link></li>
                        <li><Link to="/VirtuosaCrud/moda-descuentos">Promociones</Link></li>

                    </ul>

                </li>
            </ul>
            <Link to="/VirtuosaCrud">
                <div className="logo">
                    <img src={logoVirtuosa} alt="logo" />
                </div>
            </Link>

            
            <ul className="nav-menu" id="nav-menuxd2">

                <li>
                    <Link to="/VirtuosaCrud/tips" className="item angle-symbol">TIPS <i className="fa-solid fa-angle-down"></i></Link>
                    <ul className="submenu">
                        <li><Link to="/VirtuosaCrud/tips/maquillaje">Tips Maquillaje</Link></li>
                        <li><Link to="/VirtuosaCrud/tips/ropa">Tips Ropa</Link>
                        </li>
                    </ul>
                </li>
                <li><Link to="/VirtuosaCrud/nosotros" className="item">NOSOTROS</Link></li>
                <li><Link to="/VirtuosaCrud/contacto" className="item">CONTACTO</Link></li>



            </ul>
        </nav>
    );
}

export default Home;

