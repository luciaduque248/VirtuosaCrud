import React from "react";

import {
    Link,
} from "react-router-dom";

import logoVirtuosa from "../assets/img/logo 1.svg";

import {
    useCart,
} from "../../context/CartContext";

import "./header.css";
import "./HeaderCart.css";

function Header() {
    const {
        itemCount,
    } = useCart();

    return (
        <header>
            <div className="headerBox" />

            <div className="fondonav">
                <Link
                    to="/VirtuosaCrud/"
                    className="container-logo-responsive"
                >
                    <div className="logo-responsive">
                        <img
                            src={
                                logoVirtuosa
                            }
                            alt="Virtuosa"
                        />
                    </div>
                </Link>

                <div className="icons">
                    <Link
                        to="/VirtuosaCrud/login"
                        className="iniciar-sesion"
                        aria-label="Iniciar sesión"
                    >
                        <i className="fa-regular fa-user" />
                    </Link>

                    <Link
                        to="/VirtuosaCrud/carrito"
                        className="header-cart-link"
                        aria-label={`Carrito con ${itemCount} productos`}
                    >
                        <i className="fa-solid fa-cart-shopping" />

                        {itemCount > 0 && (
                            <span className="header-cart-count">
                                {itemCount >
                                    99
                                    ? "99+"
                                    : itemCount}
                            </span>
                        )}
                    </Link>

                    <button
                        type="button"
                        className="btn-search"
                        aria-label="Buscar"
                    >
                        <i className="fa-solid fa-magnifying-glass" />
                    </button>
                </div>
            </div>
        </header>
    );
}

export default Header;