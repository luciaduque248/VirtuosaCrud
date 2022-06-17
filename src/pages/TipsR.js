import Header from '../components/header/header';
import Home from '../components/home/home';
import Footer from '../components/footer/footer';
import TipsCl from '../components/tipsR/TipsR';

import '../components/assets/css/inicio.css'

function TipsRp() {
    return (
        <div>
            <Header />
            <Home />
            <div className='banner-tips-ropa'>
                <div className='text-tips-banner'>
                    <h1 className='text-7'>7</h1>
                    <div className='texto-2-banner-tips'>
                        <h1>CONSEJOS PARA QUE TU<br/> ROPA DURE MAS TIEMPO</h1>
                    </div>
            
                </div>
            </div>
            <TipsCl/>
            <Footer/>
        </div>
    )
}

export default TipsRp;