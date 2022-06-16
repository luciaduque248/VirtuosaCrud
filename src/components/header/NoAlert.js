// componentes de clase o componentes de funcion 
import './header.css';

function NoAlert() {
    return (
        // caracteristicas del componente
        <header>
            <div className='headerBox-NoAlert'>
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
export default NoAlert;