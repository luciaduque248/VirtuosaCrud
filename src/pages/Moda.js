import React from 'react'
import '../components/assets/css/Moda.css'
import Nov1 from '../components/assets/img/ropa/banner/apartados/tendencias/1.jpeg'
import Nov2 from '../components/assets/img/ropa/banner/apartados/tendencias/4.jpeg'
import Nov3 from '../components/assets/img/ropa/banner/apartados/tendencias/3.webp'
import { Link } from 'react-router-dom'
import Header from '../components/header/header'
import Home from '../components/home/home'
import Footer from '../components/footer/footer'

function Moda() {
  return (
    <div>
      <Header/>
      <Home/>
      <section>
        <div class="banner-index-moda">
          <h1>VISTE A LA MODA</h1>
        </div>
      </section>
      <section class="submenu2">
        <a href="#vestidos"> <button className='button-index-moda'>Vestidos</button></a>
        <a href="#novedades"> <button className='button-index-moda'>Novedades</button></a>
        <a href="#"> <button className='button-index-moda'>Promociones</button></a>
      </section>

      <section class="box-categoria" id="vestidos" >
        <div class="ap-general">
          <div class="pr">
            <h1>Vestidos<br /><span>Productos destacados</span></h1>
          </div>


          <div class="modalcomp">
            <div class="modalpar"><h1>CLICK ME</h1></div>
            <div class="infomodal">
              <div class="imgBx">
                <img src="https://res.cloudinary.com/colombia/image/upload/v1650408899/kuepa/productos/1/20SWVK63_6000_4_ihfi1o.jpg" alt="" /></div>
              <div class="infomodalcomp">
                <h1>Vestidos</h1>
                <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Corrupti, ipsum. Quos, voluptas! Quis, omnis mollitia. Minus tempore assumenda at repellendus fuga quos iste rem dolorum illo neque, fugiat laborum ipsam?</p>
                <Link to="/VirtuosaCrud/moda-vestidos"> <button className='button-index-moda'>Ver más</button></Link>
              </div>
            </div>
          </div>

          <div class="box-menu">
            <div class="cardrp">
              <div class="imgBx">
                <img src="https://res.cloudinary.com/colombia/image/upload/v1650420080/kuepa/productos/2/22SWVK29_2000_4_citwlf.jpg" alt="" /></div>
              <div class="details">
                <h3>Vestido largo Boho<br /><span>Woman Dress</span></h3>
                <h4>Product Details</h4>
                <p>vestido midi de manga corta luce una capa de tul semitransparente con falda larga</p>
                <h4>Size</h4>
                <ul class="size">
                  <li>xs</li>
                  <li>s</li>
                  <li>m</li>
                  <li>l</li>
                  <li>xl</li>
                </ul>
                <div class="group">
                  <h2><sup>$</sup>100<small>.000</small></h2>
                  <Link to="/VirtuosaCrud/moda-vestidos">Buy Now</Link>
                </div>

              </div>
            </div>
            <div class="cardrp">
              <div class="imgBx">
                <img src="https://res.cloudinary.com/colombia/image/upload/v1650423647/kuepa/productos/8/22SWVK30_8021_1_jdw3c7.jpg" alt="" /></div>
              <div class="details">
                <h3>Vestido largo Boho<br /><span>Woman Dress</span></h3>
                <h4>Product Details</h4>
                <p>vestido midi de manga corta luce una capa de tul semitransparente con falda larga</p>
                <h4>Size</h4>
                <ul class="size">
                  <li>xs</li>
                  <li>s</li>
                  <li>m</li>
                  <li>l</li>
                  <li>xl</li>
                </ul>
                <div class="group">
                  <h2><sup>$</sup>100<small>.000</small></h2>
                  <Link to="/VirtuosaCrud/moda-vestidos">Buy Now</Link>
                </div>

              </div>
            </div>
            <div class="cardrp">
              <div class="imgBx">
                <img src="https://res.cloudinary.com/colombia/image/upload/v1650422327/kuepa/productos/5/22SWVK60_7041_2_tdvpke.jpg" alt="" /></div>
              <div class="details">
                <h3>Vestido largo Boho<br /><span>Woman Dress</span></h3>
                <h4>Product Details</h4>
                <p>vestido midi de manga corta luce una capa de tul semitransparente con falda larga</p>
                <h4>Size</h4>
                <ul class="size">
                  <li>xs</li>
                  <li>s</li>
                  <li>m</li>
                  <li>l</li>
                  <li>xl</li>
                </ul>
                <div class="group">
                  <h2><sup>$</sup>100<small>.000</small></h2>
                  <Link to="/VirtuosaCrud/moda-vestidos">Buy Now</Link>
                </div>

              </div>
            </div>

          </div>

        </div>
        <div class="ap-gr"></div>

      </section>

      <section class="box-categoria" id="novedades" >
        <div class="ap-general">
          <div class="pr">
            <h1>Novedades<br /><span>Nueva temporada</span></h1>
          </div>
          <div class="modalcomp">
            <div class="modalpar"><h1>CLICK ME</h1></div>
            <div class="infomodal">
              <div class="imgBx">
                <img src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=420&q=80" alt="" /></div>
              <div class="infomodalcomp">
                <h1>Novedades</h1>
                <p>Descubre la actualidad de moda en Virtuosa.com. Lo último en looks, diseñadores, accesorios, pasarelas y tendencias de moda. Obtenga información puntual de todas las pasarelas internacionales y toda la información sobre las mejores 'top models' del mundo.</p>
                <Link to="/VirtuosaCrud/moda-tendencias"> <button className='button-index-moda'>Ver más</button></Link></div>
            </div>
          </div>

          <div class="box-menu">
            <div class="cardrp">
              <div class="imgBx">
                <img src={Nov1} alt="" /></div>
              <div class="details">
                <h3>Virtuosa<br /><span>Virtuosa presentará su colección Crucero 2023 en Sevilla</span></h3>
                <div class="group">
                  <Link to="/VirtuosaCrud/moda-tendencias">Ver más</Link>
                </div>
              </div>
            </div>
            <div class="cardrp">
              <div class="imgBx">
                <img src={Nov2} alt="" /></div>
              <div class="details">
                <h3>Plaza España<br /><span>sí es la tienda de Inditex más grande del mundo que acaba de abrir en Madrid</span></h3>
                <div class="group">
                  <Link to="/VirtuosaCrud/moda-tendencias">Ver más</Link>
                </div>
              </div>
            </div>
            <div class="cardrp">
              <div class="imgBx">
                <img src={Nov3} alt="" /></div>
              <div class="details">
                <h3>Moda<br /><span>7 bolsos de capricho para arrasar esta primavera</span></h3>
                <div class="group">
                  <Link to="/VirtuosaCrud/moda-tendencias">Ver más</Link>
                </div>
              </div>
            </div>

          </div>

        </div>
        <div class="ap-gr"></div>

      </section>
      <section class="box-categoria" id="promociones" >


        <div class="ap-general">
          <div class="pr">
            <h1>Promociones<br /><span>Grandes Descuentos %</span></h1>
          </div>


          <div class="modalcomp">
            <div class="modalpar"><h1>CLICK ME</h1></div>
            <div class="infomodal">
              <div class="imgBx">
                <img src="https://res.cloudinary.com/colombia/image/upload/v1650498773/kuepa/descuentos/1/20WWVK61_3007_1_a7gbkb.jpg" alt="" /></div>
              <div class="infomodalcomp">
                <h1>Promociones</h1>
                <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Corrupti, ipsum. Quos, voluptas! Quis, omnis mollitia. Minus tempore assumenda at repellendus fuga quos iste rem dolorum illo neque, fugiat laborum ipsam?</p>
                <Link to="/VirtuosaCrud/moda-descuentos"><button className='button-index-moda'>Ver más</button></Link></div>
            </div>
          </div>

          <div class="box-menu">
            <div class="cardrp">
              <div class="imgBx">
                <img src="https://res.cloudinary.com/colombia/image/upload/v1650501952/kuepa/descuentos/2/22SWVW76_9019_2_wlwdut.jpg" alt="" /></div>
              <div class="details">
                <h3>Vestido largo Boho<br /><span>Woman Dress</span></h3>
                <h4>Product Details</h4>
                <p>vestido midi de manga corta luce una capa de tul semitransparente con falda larga</p>
                <h4>Size</h4>
                <ul class="size">
                  <li>xs</li>
                  <li>s</li>
                  <li>m</li>
                  <li>l</li>
                  <li>xl</li>
                </ul>
                <div class="group">
                  <h2><sup>$</sup>100<small>.000</small></h2>
                  <Link to="/VirtuosaCrud/moda-descuentos">Buy Now</Link>
                </div>

              </div>
            </div>
            <div class="cardrp">
              <div class="imgBx">
                <img src="https://res.cloudinary.com/colombia/image/upload/v1654117323/kuepa/descuentos/3/22SWVKXC_7002_4_oeeevd.jpg" alt="" /></div>
              <div class="details">
                <h3>Vestido largo Boho<br /><span>Woman Dress</span></h3>
                <h4>Product Details</h4>
                <p>vestido midi de manga corta luce una capa de tul semitransparente con falda larga</p>
                <h4>Size</h4>
                <ul class="size">
                  <li>xs</li>
                  <li>s</li>
                  <li>m</li>
                  <li>l</li>
                  <li>xl</li>
                </ul>
                <div class="group">
                  <h2><sup>$</sup>100<small>.000</small></h2>
                  <Link to="/VirtuosaCrud/moda-descuentos">Buy Now</Link>
                </div>

              </div>
            </div>
            <div class="cardrp">
              <div class="imgBx">
                <img src="https://res.cloudinary.com/colombia/image/upload/v1654117864/kuepa/descuentos/4/22SWVK46_2000_6_myvfip.jpg" alt="" /></div>
              <div class="details">
                <h3>Vestido largo Boho<br /><span>Woman Dress</span></h3>
                <h4>Product Details</h4>
                <p>vestido midi de manga corta luce una capa de tul semitransparente con falda larga</p>
                <h4>Size</h4>
                <ul class="size">
                  <li>xs</li>
                  <li>s</li>
                  <li>m</li>
                  <li>l</li>
                  <li>xl</li>
                </ul>
                <div class="group">
                  <h2><sup>$</sup>100<small>.000</small></h2>
                  <Link to="/VirtuosaCrud/moda-descuentos">Buy Now</Link>
                </div>

              </div>
            </div>

          </div>

        </div>
        <div class="ap-gr"></div>

      </section>
      <Footer/>

    </div>
  )
}

export default Moda