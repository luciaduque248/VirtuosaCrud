import React from "react";
import ImgMakeup from '../assets/img/tips/imgMakeup.png';
import ImgMakeupp from '../assets/img/tips/imgMakeupp.png';
import '../../components/tipsM/TipsM.css'

function TipsMk() {
    return (

        <div>

            <div className='recuadro-blanco'>
                <div className="Makeup-all">
                    <div className="Makeup">

                        <img src={ImgMakeup} alt='ImgMakeup' className='ImgMakeup' />

                        <p> El maquillaje es una gran herramienta que nos ayuda a resaltar nuestra belleza. Si quieres conservar tus cosméticos el mayor tiempo posible, evitando maltratarlo y sin hacer que pierda su calidad, tienes que seguir estos tips ¡y ponerlos en práctica desde hoy!</p>

                        <span><h3>1. Evita la humedad</h3></span>
                        <p>No guardes tus cosméticos en lugares húmedos como el baño. Los espacios secos y con buena circulación de aire son la mejor opción para cuidar tu maquillaje.</p>

                        <span><h3>2. ¡Ciérralo bien!</h3></span>
                        <p>Asegúrate siempre de cerrar perfectamente cada uno de tus artículos de maquillaje, desde tu mascara hasta tu lipstick. De esta manera, prevendrás que se sequen, se oxiden o evaporen, también evitarás que les entre polvo o bacterias.</p>

                        <span><h3>3. Caducidad</h3></span>
                        <p>Cada uno de tus cosméticos tiene fecha de caducidad, reemplázalos por otros nuevos en cuanto haya expirado su período de efectividad. Por ejemplo, la mascara suele durar tres meses, los esmaltes y lipsticks alrededor de un año, las sombras y el polvo compacto hasta dos años.</p>

                        <img src={ImgMakeupp} alt='ImgMakeupp' className='ImgMakeupp' />

                        <span><h3>4. Higiene</h3></span>
                        <p>Es importante que laves tu cosmetiquera , por lo menos, una vez al mes. También que siempre te laves las manos antes de usar tu maquillaje y, de preferencia, que evites aplicarlo directamente con tus dedos. Las brochas debes limpiarlas con un líquido especial, una vez al mes.</p>

                        <span><h3>5. ¡No compartas!</h3></span>
                        <p>Sin importar si es tu bff o tu mamá, lo ideal es que tu maquillaje sea 100% personal. Evita prestar tus cosméticos para que se mantenga en buenas condiciones y no adquieras alguna infección que pueda tener otra persona en su cutis, como acné.</p>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default TipsMk;