import Header from '../components/header/header';
import Home from '../components/home/home';
import Footer from '../components/footer/footer';
import TipsMk from '../components/tipsM/TipsM';

import '../components/assets/css/inicio.css'

function TipsM() {
    return (
        <div>
            <Header />
            <Home />
            <div className='banner-tips-makeup'>
                <div className='text-makeup-banner'>
                    <h1 className='text-5'>5</h1>
                    <div className='texto-2-banner-makeup'>
                        <h1>CONSEJOS PARA QUE TU<br/> MAQUILLAJE DURE MAS TIEMPO</h1>
                    </div>
            
                </div>
            </div>
            <TipsMk/>
            <Footer/>
        </div>
    )
}

export default TipsM;