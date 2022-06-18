// componentes de clase o componentes de funcion 
import { Link } from 'react-router-dom';
import logoVirtuosa from '../assets/img/logo 1.svg';
import './header.css';

function Header() {
    return (
        // caracteristicas del componente
        <header>
            <div className='headerBox'></div>

            <div className='fondonav'>
                <Link to="/VirtuosaCrud" className='container-logo-responsive'>
                    <div className=" logo-responsive">
                        <img src={logoVirtuosa} alt="logo" />
                    </div>
                </Link>
                <div className='icons'>
                    <Link to='/VirtuosaCrud/login'><button className="iniciar-sesion"><i class="fa-regular fa-user"></i></button></Link>
                    <button className="btns-header"><i class="fa-solid fa-cart-shopping"></i></button>
                    <button className="btn-search">
                        <i class="fa-solid fa-magnifying-glass"></i></button>
                </div>
            </div>

        </header>
    );
}
export default Header;