import React, { Component } from "react";
import Slider from "react-slick";

import '../Maquillaje.css'

export default class SimpleSlider extends Component {
  render() {
    const settings = {
      dots: true,
      infinite: true,
      autoplay: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    };
    return (
      <div>
        <Slider {...settings}>
          <div className="makeup-slide">
                <img src="https://as2.ftcdn.net/v2/jpg/02/91/74/87/1000_F_291748700_owTB4oJPkTTYe5IagHMtMsptzpB68jSm.jpg" alt="imagen" className="makeup-img"/>
          </div>
          <div className="makeup-slide">
            <img src="https://cdn.pixabay.com/photo/2015/11/26/00/54/cosmetics-1063134_960_720.jpg" className="makeup-img" alt="imagen"/>
          </div>
          <div className="makeup-slide">
            <img src="https://cdn.pixabay.com/photo/2021/12/01/08/45/beauty-6837031_960_720.jpg" className="makeup-img" alt="imagen"/>
          </div>
          <div className="makeup-slide">
            <img src="https://cdn.pixabay.com/photo/2016/07/26/16/48/cosmetics-1543276_960_720.jpg" className="makeup-img" alt="imagen"/>
          </div>
        </Slider>
      </div>
    );
  }
}