import Header from '../components/header/header';
import Home from '../components/home/home';
import Footer from '../components/footer/footer';
import Nosinfo from '../components/nosotros/Nosinfo';

import '../components/assets/css/inicio.css'

function Nosotros() {
    return (
        <div>
            <Header />
            <Home />
            <div className='banner-tips-nosotros'>
                <div className='text-tips-banner-nosotros'>
                    <h1>NOSOTROS</h1>
                </div>
            </div>
            <Nosinfo/>
            <Footer/>
        </div>
    )
}

export default Nosotros;