import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

import logoVirtuosa from "../assets/img/logo 1.svg";
import "../header/header.css";

function Home() {
    const [menuOpen, setMenuOpen] = useState(false);
    const location = useLocation();
    const closeMenu = () => setMenuOpen(false);

    return (
        <nav className="site-nav" aria-label="Navegación principal">
            <div className="site-nav-inner">
                <Link to="/VirtuosaCrud" className="nav-logo" onClick={closeMenu} aria-label="Virtuosa, inicio">
                    <img src={logoVirtuosa} alt="Virtuosa" />
                </Link>
                <button type="button" className="nav-toggle" aria-expanded={menuOpen} aria-controls="main-navigation" onClick={() => setMenuOpen((open) => !open)}>
                    <i className={`fa-solid ${menuOpen ? "fa-xmark" : "fa-bars"}`} aria-hidden="true" />
                    <span>Menú</span>
                </button>
                <div id="main-navigation" className={`nav-links ${menuOpen ? "is-open" : ""}`}>
                    <Link className={location.pathname === "/VirtuosaCrud" || location.pathname === "/VirtuosaCrud/" ? "active" : ""} to="/VirtuosaCrud" onClick={closeMenu}>Inicio</Link>
                    <div className="nav-group">
                        <Link to="/VirtuosaCrud/maquillaje" onClick={closeMenu}>Maquillaje</Link>
                        <div className="nav-submenu">
                            <Link to="/VirtuosaCrud/rostro" onClick={closeMenu}>Rostro</Link>
                            <Link to="/VirtuosaCrud/ojos" onClick={closeMenu}>Ojos</Link>
                            <Link to="/VirtuosaCrud/piel" onClick={closeMenu}>Piel</Link>
                            <Link to="/VirtuosaCrud/labios" onClick={closeMenu}>Labios</Link>
                        </div>
                    </div>
                    <div className="nav-group">
                        <Link to="/VirtuosaCrud/moda" onClick={closeMenu}>Moda</Link>
                        <div className="nav-submenu">
                            <Link to="/VirtuosaCrud/moda-vestidos" onClick={closeMenu}>Vestidos</Link>
                            <Link to="/VirtuosaCrud/moda-tendencias" onClick={closeMenu}>Novedades</Link>
                            <Link to="/VirtuosaCrud/moda-descuentos" onClick={closeMenu}>Promociones</Link>
                        </div>
                    </div>
                    <div className="nav-group">
                        <Link to="/VirtuosaCrud/tips" onClick={closeMenu}>Tips</Link>
                        <div className="nav-submenu">
                            <Link to="/VirtuosaCrud/tips/maquillaje" onClick={closeMenu}>Tips maquillaje</Link>
                            <Link to="/VirtuosaCrud/tips/ropa" onClick={closeMenu}>Tips ropa</Link>
                        </div>
                    </div>
                    <Link to="/VirtuosaCrud/nosotros" onClick={closeMenu}>Nosotros</Link>
                    <Link to="/VirtuosaCrud/contacto" onClick={closeMenu}>Contacto</Link>
                </div>
            </div>
        </nav>
    );
}

export default Home;
