import React, {
  useEffect,
  useState,
} from "react";

import {
  Link,
  NavLink,
  useLocation,
  useNavigate,
} from "react-router-dom";

import Logo from "../../assets/img/logo.svg";

import apiClient from "../../../services/apiClient";

import {
  useAuth,
} from "../../../context/AuthContext";

import {
  confirmLogout,
} from "../../../utils/alerts";

import "./NavbarAdmin.css";


function NavbarAdmin() {
  const navigate =
    useNavigate();

  const location =
    useLocation();

  const {
    user,
    logout,
  } = useAuth();

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


  useEffect(() => {
    setMenuOpen(false);
  }, [
    location.pathname,
  ]);


  useEffect(() => {
    let active =
      true;

    const checkApi =
      async () => {
        try {
          await apiClient.get(
            "/health",
            {
              timeout:
                4000,
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


  const handleLogout =
    async () => {
      const confirmed =
        await confirmLogout();

      if (!confirmed) {
        return;
      }

      logout();

      navigate(
        "/VirtuosaCrud/login",
        {
          replace:
            true,
        }
      );
    };


  const navClass = ({
    isActive,
  }) =>
    isActive
      ? "admin-navbar-link active"
      : "admin-navbar-link";


  const statusText =
    apiStatus ===
      "connected"
      ? "API conectada"
      : apiStatus ===
        "disconnected"
        ? "API desconectada"
        : "Verificando API";


  return (
    <header className="admin-navbar">
      <div className="admin-navbar-container">
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

        <div className="admin-navbar-actions">
          <div
            className={`admin-api-status ${apiStatus}`}
          >
            <span className="admin-api-dot" />

            <span className="admin-api-label">
              {statusText}
            </span>
          </div>

          <Link
            to="/VirtuosaCrud/"
            className="admin-store-button"
          >
            <i className="fa-solid fa-arrow-up-right-from-square" />

            <span>
              Ver tienda
            </span>
          </Link>

          <div className="admin-user">
            <div className="admin-user-avatar">
              <i className="fa-solid fa-user" />
            </div>

            <div className="admin-user-info">
              <strong>
                {user?.name ||
                  "Admin"}
              </strong>

              <span>
                {user?.email ||
                  "Administrador"}
              </span>
            </div>
          </div>

          <button
            type="button"
            className="admin-logout-button"
            onClick={
              handleLogout
            }
          >
            <i className="fa-solid fa-arrow-right-from-bracket" />
          </button>

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

      <div
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
            Inicio
          </NavLink>

          <NavLink
            to="/VirtuosaCrud/edit-vestidos"
            className={
              navClass
            }
          >
            Vestidos
          </NavLink>

          <NavLink
            to="/VirtuosaCrud/edit-descuentos"
            className={
              navClass
            }
          >
            Descuentos
          </NavLink>

          <NavLink
            to="/VirtuosaCrud/edit-maquillaje"
            className={
              navClass
            }
          >
            Maquillaje
          </NavLink>

          <Link
            to="/VirtuosaCrud/"
            className="admin-navbar-link"
          >
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