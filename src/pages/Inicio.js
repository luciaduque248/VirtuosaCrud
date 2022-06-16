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
            <section class="contenido">
        <div class="maquillaje-inicio">
            <h1>DEFINE TU BELLEZA</h1>
            <button><Link to="*" className="active item">Ver más</Link></button>
        </div>
        <div class="ropa">
            <h1>DISEÑOS EXCLUSIVOS</h1>
            <button><Link to="/moda" className="active item">Ver más</Link></button>
        </div>
    </section>

    <section class="rosa">
        <div class="rose">
            <div class="iconoRose">
                <i class="fa-solid fa-box-open fa-lg"></i>
            </div>
            <div class="contentRose">
                <h3>ENVIO GRATIS</h3>
                <p>DESDE $200.000</p>
            </div>
        </div>

        <div class="rose">
            <div class="iconoRose">
                <i class="fa-solid fa-bag-shopping fa-lg"></i>
            </div>
            <div class="contentRose">
                <h3>COMPRA 100%</h3>
                <h4>SEGURA</h4>
            </div>
        </div>

        <div class="rose">
            <div class="iconoRose">
                <i class="fa-solid fa-credit-card fa-lg"></i>
            </div>
            <div class="contentRose">
                <h3>MULTIPLES MEDIOS</h3>
                <p>DE PAGO</p>
            </div>
        </div>

        <div class="rose">
            <div class="iconoRose">
                <i class="fa-solid fa-cash-register fa-lg"></i>
            </div>
            <div class="contentRose">
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