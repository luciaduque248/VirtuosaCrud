import NoAlert from '../components/header/NoAlert';
import Home from '../components/home/home';
import Footer from '../components/footer/footer';
import Contacto from '../components/contacto/Contact';
import '../components/contacto/Contact.css'

import '../components/assets/css/inicio.css'


function Contact() {
    return (
        <div>
            <NoAlert/>
            <Home />
            <div className="imgfondoC"></div>
            <Contacto/>
            <Footer/>
        </div>
    )
}

export default Contact;