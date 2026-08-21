import React, {
  useEffect,
  useState,
} from "react";

import axios from "axios";

import {
  Link,
  NavLink,
  useLocation,
  useNavigate,
} from "react-router-dom";

import Logo from "../../assets/img/logo.svg";

import API_BASE_URL from "../../../utils/peticiones";

import {
  confirmLogout,
} from "../../../utils/alerts";

import "./NavbarAdmin.css";

function NavbarAdmin() {
  const navigate =
    useNavigate();

  const location =
    useLocation();

  const [
    menuOpen,
    setMenuOpen,
  ] = useState(false);

  const [
    apiStatus,
    setApiStatus,
  ] = useState(
    "checking"
  );

  /* =========================================================
     CERRAR MENÚ AL CAMBIAR DE RUTA
  ========================================================= */

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  /* =========================================================
     COMPROBAR API
  ========================================================= */

  useEffect(() => {
    let active = true;

    const checkApi =
      async () => {
        try {
          await axios.get(
            `${API_BASE_URL}/health`,
            {
              timeout: 4000,
            }
          );

          if (active) {
            setApiStatus(
              "connected"
            );
          }
        } catch (error) {
          if (active) {
            setApiStatus(
              "disconnected"
            );
          }
        }
      };

    checkApi();

    return () => {
      active = false;
    };
  }, []);

  /* =========================================================
     LOGOUT
  ========================================================= */

  const handleLogout =
    async () => {
      const confirmed =
        await confirmLogout();

      if (!confirmed) {
        return;
      }

      navigate(
        "/VirtuosaCrud/login"
      );
    };

  /* =========================================================
     NAV CLASS
  ========================================================= */

  const navClass = ({
    isActive,
  }) =>
    isActive
      ? "admin-navbar-link active"
      : "admin-navbar-link";

  /* =========================================================
     STATUS
  ========================================================= */

  const getStatusText =
    () => {
      if (
        apiStatus ===
        "connected"
      ) {
        return "API conectada";
      }

      if (
        apiStatus ===
        "disconnected"
      ) {
        return "API desconectada";
      }

      return "Verificando API";
    };

  return (
    <header className="admin-navbar">
      {/* =====================================================
          TOP
      ===================================================== */}

      <div className="admin-navbar-container">
        {/* BRAND */}

        <Link
          to="/VirtuosaCrud/admin"
          className="admin-navbar-brand"
        >
          <div className="admin-navbar-logo">
            <img
              src={Logo}
              alt="Virtuosa"
            />
          </div>

          <div className="admin-navbar-brand-text">
            <strong>
              Virtuosa
            </strong>

            <span>
              Administration
            </span>
          </div>
        </Link>

        {/* =================================================
            DESKTOP NAV
        ================================================= */}

        <nav className="admin-navbar-navigation">
          <NavLink
            to="/VirtuosaCrud/admin"
            className={
              navClass
            }
          >
            <i className="fa-solid fa-chart-line" />

            <span>
              Inicio
            </span>
          </NavLink>

          <NavLink
            to="/VirtuosaCrud/edit-vestidos"
            className={
              navClass
            }
          >
            <i className="fa-solid fa-shirt" />

            <span>
              Vestidos
            </span>
          </NavLink>

          <NavLink
            to="/VirtuosaCrud/edit-descuentos"
            className={
              navClass
            }
          >
            <i className="fa-solid fa-tags" />

            <span>
              Descuentos
            </span>
          </NavLink>

          <NavLink
            to="/VirtuosaCrud/edit-maquillaje"
            className={
              navClass
            }
          >
            <i className="fa-solid fa-wand-magic-sparkles" />

            <span>
              Maquillaje
            </span>
          </NavLink>
        </nav>

        {/* =================================================
            RIGHT AREA
        ================================================= */}

        <div className="admin-navbar-actions">
          {/* API STATUS */}

          <div
            className={`admin-api-status ${apiStatus}`}
            title={
              getStatusText()
            }
          >
            <span className="admin-api-dot" />

            <span className="admin-api-label">
              {getStatusText()}
            </span>
          </div>

          {/* VIEW STORE */}

          <Link
            to="/VirtuosaCrud/"
            className="admin-store-button"
            title="Ver tienda"
          >
            <i className="fa-solid fa-arrow-up-right-from-square" />

            <span>
              Ver tienda
            </span>
          </Link>

          {/* USER */}

          <div className="admin-user">
            <div className="admin-user-avatar">
              <i className="fa-solid fa-user" />
            </div>

            <div className="admin-user-info">
              <strong>
                Admin
              </strong>

              <span>
                Administrador
              </span>
            </div>
          </div>

          {/* LOGOUT */}

          <button
            type="button"
            className="admin-logout-button"
            onClick={
              handleLogout
            }
            title="Cerrar sesión"
          >
            <i className="fa-solid fa-arrow-right-from-bracket" />
          </button>

          {/* MOBILE BUTTON */}

          <button
            type="button"
            className="admin-menu-button"
            onClick={() =>
              setMenuOpen(
                (
                  current
                ) =>
                  !current
              )
            }
            aria-expanded={
              menuOpen
            }
            aria-controls="admin-mobile-menu"
            aria-label="Abrir menú"
          >
            <i
              className={
                menuOpen
                  ? "fa-solid fa-xmark"
                  : "fa-solid fa-bars"
              }
            />
          </button>
        </div>
      </div>

      {/* =====================================================
          MOBILE MENU
      ===================================================== */}

      <div
        id="admin-mobile-menu"
        className={
          menuOpen
            ? "admin-mobile-menu open"
            : "admin-mobile-menu"
        }
      >
        <nav>
          <NavLink
            to="/VirtuosaCrud/admin"
            className={
              navClass
            }
          >
            <i className="fa-solid fa-chart-line" />

            Inicio
          </NavLink>

          <NavLink
            to="/VirtuosaCrud/edit-vestidos"
            className={
              navClass
            }
          >
            <i className="fa-solid fa-shirt" />

            Vestidos
          </NavLink>

          <NavLink
            to="/VirtuosaCrud/edit-descuentos"
            className={
              navClass
            }
          >
            <i className="fa-solid fa-tags" />

            Descuentos
          </NavLink>

          <NavLink
            to="/VirtuosaCrud/edit-maquillaje"
            className={
              navClass
            }
          >
            <i className="fa-solid fa-wand-magic-sparkles" />

            Maquillaje
          </NavLink>

          <Link
            to="/VirtuosaCrud/"
            className="admin-navbar-link"
          >
            <i className="fa-solid fa-store" />

            Ver tienda
          </Link>

          <button
            type="button"
            className="admin-mobile-logout"
            onClick={
              handleLogout
            }
          >
            <i className="fa-solid fa-arrow-right-from-bracket" />

            Cerrar sesión
          </button>
        </nav>
      </div>
    </header>
  );
}

export default NavbarAdmin;