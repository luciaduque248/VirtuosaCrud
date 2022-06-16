import NoAlert from '../../components/header/NoAlert';
import Footer from '../../components/footer/footer';
import Home from '../../components/home/home';  // nav bar

import '../../components/assets/css/Tendencias.css';

import Nov1 from '../../components/assets/img/ropa/banner/apartados/tendencias/1.jpeg';
import Nov2 from '../../components/assets/img/ropa/banner/apartados/tendencias/2.jpeg';
import Nov3 from '../../components/assets/img/ropa/banner/apartados/tendencias/3.webp';
import Nov4 from '../../components/assets/img/ropa/banner/apartados/tendencias/4.jpeg';
import Nov5 from '../../components/assets/img/ropa/banner/apartados/tendencias/5.webp';
import Nov6 from '../../components/assets/img/ropa/banner/apartados/tendencias/6.webp';
import { Link } from 'react-router-dom';

function Tendencias() {
    return (
        <div>
            <NoAlert/>
            <Home />
            <section className="banner-nov">
                <h1>NOVEDADES<br />TENDENCIAS</h1>
            </section>

            <div className="container-nov">
                
                
                <div className="content">
                    <div className="text1">
                        <p>Descubre la actualidad de moda en <span className="special">Virtuosa.com</span>. Lo último en looks, diseñadores, accesorios, pasarelas y tendencias de moda. Obtenga información puntual de todas las pasarelas internacionales y toda la información sobre las mejores 'top models' del mundo.</p>
                        <br />
                        <p>Estamos revolucionando el mundo de la moda con inteligencia. Pide todo lo que quieres y necesitas para tu look perfecto, encuentralo en pocos clicks y las 24 horas del dia, con servicios de entrega nacional.
                            <em><span className="special"> Virtuosa #SmartFashion</span></em> es el mayor e-commerce de moda y estilo de vida en Latinoamerica y a nivel internacional.</p>
                    </div>
                    <div className="text2">
                        <em>¡Ahora es el momento de refrescar tu look! Descubre lo que el mundo tiene para ti en la moda y maquillaje.</em>
                    </div>
                    <div className="nov1">
                        <img src={Nov1} alt="dior" />
                        <div className="summary1">
                            <h5>Dior presentará su colección Crucero 2023 en Sevilla</h5>
                        </div>
                    </div>
                    <div className="nov2">
                        <img src={Nov2} alt="labios" />
                        <div className="summary2">
                            <h5>Encuentra los mejores labiales rojos para cada tono de piel </h5>
                        </div>
                    </div>
                    <div className="nov3">
                        <img src={Nov3} alt="bolsos" />
                        <div className="summary3">
                            <h5>7 bolsos de capricho para arrasar esta primavera</h5>
                        </div>
                    </div>
                    <div className="nov4">
                        <img src={Nov4} alt="" />
                        <div className="summary4">
                            <h5>Zara de Plaza España: así es la tienda de Inditex más grande del mundo que acaba de abrir en Madrid</h5>
                        </div>
                    </div>
                    <div className="nov5">
                        <img src={Nov5} alt="" />
                        <div className="summary5">
                            <h5>Deporte al aire libre: por qué es mejor entrenar cerca de la naturaleza</h5>
                        </div>
                    </div>
                    <div className="nov6">
                        <img src={Nov6} alt="" />
                        <div className="summary6">
                            <h5>Cuidado facial: 3 productos (tamaño viaje) que no pueden faltar en un buen neceser de vacaciones</h5>
                        </div>
                    </div>
                    <div className="selection">
                        <Link to="*" className="page1">1</Link>
                        <Link to="*" className="pages">2</Link>
                        <Link to="*" className="pages">3</Link>
                        <Link to="*" className="pages">...</Link>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
        
    )

}

export default Tendencias;