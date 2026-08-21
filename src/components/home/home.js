import React, { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

import "../header/header.css";

const navGroups = [
    { label: "Maquillaje", path: "/VirtuosaCrud/maquillaje", children: [["Rostro", "/VirtuosaCrud/rostro"], ["Ojos", "/VirtuosaCrud/ojos"], ["Piel", "/VirtuosaCrud/piel"], ["Labios", "/VirtuosaCrud/labios"]] },
    { label: "Moda", path: "/VirtuosaCrud/moda", children: [["Vestidos", "/VirtuosaCrud/moda-vestidos"], ["Novedades", "/VirtuosaCrud/moda-tendencias"], ["Promociones", "/VirtuosaCrud/moda-descuentos"]] },
    { label: "Journal", path: "/VirtuosaCrud/tips", children: [["Tips de maquillaje", "/VirtuosaCrud/tips/maquillaje"], ["Tips de moda", "/VirtuosaCrud/tips/ropa"]] },
];

function Home() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [openGroup, setOpenGroup] = useState(null);
    const location = useLocation();

    useEffect(() => {
        setMenuOpen(false);
        setOpenGroup(null);
    }, [location.pathname]);

    useEffect(() => {
        const closeOnEscape = (event) => {
            if (event.key === "Escape") {
                setMenuOpen(false);
                setOpenGroup(null);
            }
        };
        document.addEventListener("keydown", closeOnEscape);
        return () => document.removeEventListener("keydown", closeOnEscape);
    }, []);

    const navClassName = ({ isActive }) => isActive ? "active" : undefined;

    return (
        <nav className="site-nav" aria-label="Navegación principal">
            <div className="site-nav-inner">
                <button type="button" className="nav-toggle" aria-expanded={menuOpen} aria-controls="main-navigation" onClick={() => setMenuOpen((open) => !open)}>
                    <span className="nav-toggle-icon" aria-hidden="true"><i /><i /></span>
                    <span>{menuOpen ? "Cerrar" : "Menú"}</span>
                </button>

                <div id="main-navigation" className={`nav-links ${menuOpen ? "is-open" : ""}`}>
                    <NavLink end className={navClassName} to="/VirtuosaCrud/">Inicio</NavLink>
                    {navGroups.map(({ label, path, children }) => (
                        <div className={`nav-group ${openGroup === label ? "is-expanded" : ""}`} key={path}>
                            <div className="nav-group-heading">
                                <NavLink className={navClassName} to={path}>{label}</NavLink>
                                <button type="button" aria-label={`Mostrar categorías de ${label}`} aria-expanded={openGroup === label} onClick={() => setOpenGroup((current) => current === label ? null : label)}>
                                    <i className="fa-solid fa-chevron-down" aria-hidden="true" />
                                </button>
                            </div>
                            <div className="nav-submenu">
                                <span>{label}</span>
                                {children.map(([childLabel, childPath]) => <NavLink className={navClassName} to={childPath} key={childPath}>{childLabel}<i className="fa-solid fa-arrow-right" aria-hidden="true" /></NavLink>)}
                            </div>
                        </div>
                    ))}
                    <NavLink className={navClassName} to="/VirtuosaCrud/nosotros">Nosotros</NavLink>
                    <NavLink className={navClassName} to="/VirtuosaCrud/contacto">Contacto</NavLink>
                </div>
            </div>
        </nav>
    );
}

export default Home;
