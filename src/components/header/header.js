// componentes de clase o componentes de funcion 
import './header.css';

function Header() {
    return (
        // caracteristicas del componente
        <header>
            <div className='grayLine'></div>
            <div className='headerBox'>
                <p>Importante: Envios nacionales entre 2 a 3 dias habiles | Envios en Bogota entre 1 a 2 dias habiles</p>
            </div>
            <div className='fondonav'>
                <div className='icons'>
                    <i className="fa-regular fa-user fa-lg fa-derecha"></i>
                    <i className="fa-regular fa-heart fa-lg fa-derecha"></i>
                    <i className="fa-solid fa-bag-shopping fa-lg fa-derecha"></i>
                </div>
            </div>
            
        </header>
    );
}
export default Header;