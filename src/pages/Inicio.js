import Header from '../components/header/header';
import Footer from '../components/footer/footer';
import Home from '../components/home/home';  // nav bar
import { Link } from 'react-router-dom';

import '../components/assets/css/inicio.css'

function Inicio() {
    return (
        <div>
            <Header />
            <Home />
            <section className="contenido">
        <div className="maquillaje-inicio">
            <h1>DEFINE TU BELLEZA</h1>
            <button><Link to="/VirtuosaCrud/maquillaje" className="active item">Ver más</Link></button>
        </div>
        <div className="ropa">
            <h1>DISEÑOS EXCLUSIVOS</h1>
            <button><Link to="/VirtuosaCrud/moda" className="active item">Ver más</Link></button>
        </div>
    </section>

    <section className="rosa">
        <div className="rose">
            <div className="iconoRose">
                <i className="fa-solid fa-box-open fa-lg"></i>
            </div>
            <div className="contentRose">
                <h3>ENVIO GRATIS</h3>
                <p>DESDE $200.000</p>
            </div>
        </div>

        <div className="rose">
            <div className="iconoRose">
                <i className="fa-solid fa-bag-shopping fa-lg"></i>
            </div>
            <div className="contentRose">
                <h3>COMPRA 100%</h3>
                <h4>SEGURA</h4>
            </div>
        </div>

        <div className="rose">
            <div className="iconoRose">
                <i className="fa-solid fa-credit-card fa-lg"></i>
            </div>
            <div className="contentRose">
                <h3>MULTIPLES MEDIOS</h3>
                <p>DE PAGO</p>
            </div>
        </div>

        <div className="rose">
            <div className="iconoRose">
                <i className="fa-solid fa-cash-register fa-lg"></i>
            </div>
            <div className="contentRose">
                <h3>DEVOLUCIONES</h3>
                <h4>SIN COSTO</h4>
            </div>
        </div>
    </section>
            <Footer/>
        </div>
    )
}

export default Inicio;
