import React from "react";
import ReactPlayer from "react-player";
import Slider from "react-slick";

import '../../../../components/assets/css/Vestidos.css'

function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, display: "block", background: "#8765be", borderRadius: "35px", height: "38px", width: "35px", paddingTop: "0.6rem" }}
            onClick={onClick}
        />
    );
}

function SamplePrevArrow(props) {
    const { className, style, onClick } = props;

    return (
        <div
            className={className}
            style={{ ...style, display: "block", background: "#8765be", borderRadius: "35px", height: "38px", width: "35px", paddingTop: "0.6rem" }}
            onClick={onClick}
        />
    );
}

function SliderCarousel({ carousel }) {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />
    };
    return (
        <div>
            <Slider {...settings}>
                {
                    carousel?.map((imagen,index) => {
                        switch (imagen[0]) {
                            case "img":
                                return <div key={index}>
                                    <img src={imagen[1]} alt="slider" className="modalImg" />
                                </div>;
                            case "video":
                                return <div className="video" key={index}>
                                    <ReactPlayer url={imagen[1]}
                                        width='100%'
                                        height='100%'
                                        loop
                                        playing
                                        muted />
                                </div>;

                            default:
                                break;
                        }
                    })
                }
            </Slider>
        </div>
    )
}

export default SliderCarousel;