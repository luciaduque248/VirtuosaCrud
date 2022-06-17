import Header from '../components/header/header';
import Home from '../components/home/home';
import Footer from '../components/footer/footer';
import Contacto from '../components/contacto/Contacto';
import '../components/contacto/Contacto.css'

import '../components/assets/css/inicio.css'

function Contact() {
    return (
        <div>
            <Header />
            <Home />
            <div className='banner-tips-contacto'>
                <div className='text-tips-banner-contacto'>
                    <h1>CONTÁCTANOS</h1>
                </div>
            </div>
            <Contacto />
            <Footer />
        </div>
    )
}

export default Contact;