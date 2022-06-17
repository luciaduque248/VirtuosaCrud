import React from "react";
import logRoss from '../assets/img/tips/logGris.png';
import '../../components/nosotros/Nosinfo.css'

function Nosinfo() {
    return (

        <div>
            <div className="recuadro-blanco">
                <div className="Nosotros-all">
                    <div className="nosotros">
                        <span><h2>¿POR QUÉ NO TE ATREVES A COMPRAR ONLINE?<br />TE ABRIMOS LA PUERTA A UN MUNDO QUE MERECE LA PENA CONOCER...</h2></span>

                        <div align="center"><img src={logRoss} alt='logRoss' className='logRoss' /></div>

                        <p>Virtuosa es un E-commerce de productos de belleza, que comercializa sus productos a través de canales digitales siendo así una empresa innovadora y dinámica que brinda la facilidad de poder comprar desde cualquier lugar 24/7; así mismo ofrece asesoría personalizada para tomar una excelente decisión de compra.</p>

                        <p>Nace gracias al espíritu emprendedor de una pareja de visionarios el 18 de Agosto de 2017 en Bogota, que se da cuenta la necesidad de poder redefinir el concepto de compra de productos de belleza al detal y por mayor a partir de las siguientes premisas de valor:</p>

                        <p className="pont"><span>1. </span> La optimización de procesos es fundamental para brindar una excelente experiencia de compra.</p>
                        <p className="pont"><span>2. </span> La calidad de los productos es clave para tener los mejores resultados. Por eso, en nuestra tienda jamás verás una marca o producto que no haya pasado todos los filtros de control de calidad antes de ser comercializado.</p>
                        <p className="pont"><span>3.</span> Los precios de los productos deben ser asequibles para todos.</p>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default Nosinfo;