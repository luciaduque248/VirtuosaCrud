
import Home from '../components/home/home';
import Footer from '../components/footer/footer';
import NoAlert from '../components/header/NoAlert';
import Makeup from './maquillaje/Makeup';


function Maquillaje() {
    return(
        <div>
            <NoAlert />
            <Home />
            <Makeup/>
            <Footer />
        </div>
    )
}

export default Maquillaje;