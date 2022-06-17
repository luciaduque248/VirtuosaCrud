import React from "react";
import ImgRopa from '../assets/img/tips/imgTipsRopa.png';
import '../../components/tipsR/TipsR.css'

function TipsR() {
    return (
        <div>

            <div className="recuadro-blanco" >
                <div className="ropaTips">
                <div className="texRopa">
                    <img src={ImgRopa} alt='ImgRopa' className='ImgRopa'/>

                    <p>Nuestras prendas favoritas constituyen parte de nuestra historia personal. Recordar qué llevábamos puesto el día que nos pasaron cosas relevantes en nuestra vida es normal cuando la moda ocupa una porción de tu mundo. Por ello, nuestras prendas merecen de nuestra atención y cuidado, para que tengan una vida útil larga y nos acompañen en muchos capítulos más. Aquí dejamos unos cuantos consejos para mimarlas cómo se mercen.</p>

                    <span><h3>1. Utiliza la lavadora con sabiduría</h3></span>                    
                    <p> vez nos quitamos una prenda, no guardarla directamente en el armario ni tampoco lanzarla a la cesta de la ropa sucia, sino <span>colgarla en un lugar aireado</span>. Después, si la prenda no está manchada y sólo le has dado un único uso desde la última vez que la lavaste, deberías considerar darle algún uso más antes de volverla a lavar.</p>

                    <span><h3>2. A las perchas lo que es de las perchas (las prendas de punto nunca)</h3></span>
                    <p>La ropa de punto <span>no debería colgarse bajo ningún concepto en perchas.</span>  No hay ninguna necesidad de torturar la ropa de esta forma. Si tienes alguna prenda de punto muy fina puedes doblarla con un folio de papel.</p>
                        
                    <span><h3>3. Aprender a tender</h3></span>                    
                    <p>Al tender es conveniente <span>buscar los pliegues</span> de la ropa para colocar las pinzas: axilas en camisetas, e ingle en pantalones.</p>
                        
                    <span><h3>4. El truco de la seda</h3></span>
                    <p>Para lavar una pieza de seda que ha sido usada pero no está sucia, hay un truco muy eficaz que la deja como nueva: <span>limpiarla con vapor de agua.</span> Consiste en colocar la prenda en su percha y al ir a ducharte, colgarla dentro del cuarto de baño.</p>
                        
                    <span><h3>5. Cuero</h3></span>                    
                    <p>Guardar la prenda en una bolsa de ropa, pero evitando doblarla, pues podrías provocar que se deforme. Obvia decir que el cuero no debería meterse en la lavadora, sino <span>limpiarlo siempre en seco</span>, con un producto destinado a este fin y una esponja seca. </p>
                        
                    <span><h3>6. Lavar a mano</h3></span>                    
                    <p>Recomendamos lavar las prendas en un orden concreto: <span>de la más clara a la más oscura</span>, con idea de aprovechar mejor el agua y que las prendas oscuras no contaminen con su tinte otras más claras. Para hacerlo bien habría que usar un detergente especial para prendas delicadas verterlo en el agua y mezclarlo con ésta antes de introducir la prenda.</p>
                        
                    <span><h3>7. Productos</h3></span>                    
                    <p>Los productos convencionales contienen químicos artificiales que dañan la prenda o <span>dejan toxinas en el tejido</span> o en el agua. Algo que no ocurre con los ingredientes naturales. así que te recomendamos que explores productos de marcas ecológicas que emplean ingredientes naturales. Muy recomendables para las personas que tienen la piel muy sensible.</p>
                </div>
            </div>
            </div>
            
        </div>
);
}

export default TipsR;