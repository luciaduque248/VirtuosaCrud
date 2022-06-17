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
                    <Link to="/VirtuosaCrud/maquillaje" className="item">MAQUILLAJE <i className="fa-solid fa-angle-down"></i></Link>
                    <ul className="submenu">
                        <li><Link to="/VirtuosaCrud/rostro">Rostro</Link></li>
                        <li><Link to="/VirtuosaCrud/ojos">Ojos</Link></li>
                        <li><Link to="/VirtuosaCrud/piel">Piel</Link></li>
                        <li><Link to="/VirtuosaCrud/labios">Labios</Link></li>
                    </ul>
                </li>
                <li>
                    <Link to="/VirtuosaCrud/moda" className="item">MODA <i className="fa-solid fa-angle-down"></i></Link>
                    <ul className="submenu">
                        <li><Link to="/VirtuosaCrud/moda-vestidos">Vestidos</Link></li>
                        <li><Link to="/VirtuosaCrud/moda-diseña">Diseña tu look</Link></li>
                        <li><Link to="/VirtuosaCrud/moda-tendencias">Novedades</Link></li>
                        <li><Link to="/VirtuosaCrud/moda-descuentos">Promociones</Link></li>
                    </ul>
                </li>
                <li>
                    <Link to="/VirtuosaCrud/tips" className="item">TIPS <i className="fa-solid fa-angle-down"></i></Link>
                    <ul className="submenu">
                        <li><Link to="/VirtuosaCrud/*">Tips Maquillaje</Link></li>
                        <li><Link to="/VirtuosaCrud/*">Tips Ropa</Link></li>
                    </ul>
                </li>

            </ul>
            <Link to="/VirtuosaCrud">
                <div className="logo">
                    <img src={logoVirtuosa} alt="logo" />
                </div>
            </Link>
            
            <ul className="nav-menu">

                <li><Link to="/VirtuosaCrud/experiencias" className="item">EXPERIENCIAS</Link></li>
                <li><Link to="/VirtuosaCrud/nosotros" className="item">NOSOTROS</Link></li>
                <li><Link to="/VirtuosaCrud/contacto" className="item">CONTACTO</Link></li>

            </ul>
        </nav>
    );
}

export default Home;

