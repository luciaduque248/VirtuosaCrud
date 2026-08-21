import React from "react";
import { Link } from "react-router-dom";

import logoVirtuosa from "../assets/img/logo 1.svg";
import { useCart } from "../../context/CartContext";

import "./header.css";
import "./HeaderCart.css";

function Header() {
    const { itemCount } = useCart();

    return (
        <header className="site-header">
            <div className="headerBox">
                <p>Envío gratis en compras desde $200.000</p>
            </div>
            <div className="header-utility">
                <Link to="/VirtuosaCrud/" className="header-mobile-logo" aria-label="Ir al inicio">
                    <img src={logoVirtuosa} alt="Virtuosa" />
                </Link>
                <div className="header-actions">
                    <Link to="/VirtuosaCrud/login" className="header-action" aria-label="Iniciar sesión">
                        <i className="fa-regular fa-user" aria-hidden="true" />
                    </Link>
                    <Link to="/VirtuosaCrud/carrito" className="header-cart-link" aria-label={`Carrito con ${itemCount} productos`}>
                        <i className="fa-solid fa-cart-shopping" aria-hidden="true" />
                        {itemCount > 0 && <span className="header-cart-count">{itemCount > 99 ? "99+" : itemCount}</span>}
                    </Link>
                    <button type="button" className="header-action" aria-label="Buscar">
                        <i className="fa-solid fa-magnifying-glass" aria-hidden="true" />
                    </button>
                </div>
            </div>
        </header>
    );
}

export default Header;
