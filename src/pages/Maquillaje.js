
import Home from '../components/home/home';
import Footer from '../components/footer/footer';
import Makeup from './maquillaje/Makeup';
import Header from '../components/header/header';


function Maquillaje() {
    return(
        <div>
            <Header />
            <Home />
            <Makeup/>
            <Footer />
        </div>
    )
}

export default Maquillaje;