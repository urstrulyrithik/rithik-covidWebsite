import React from 'react'
import Slider from "react-slick";
import './Slider.css'


function SliderHome() {
	var settings = {
		dots: true,
		infinite: true,
		arrows: false,
		autoplay:true,
		slidesToShow: 1,
		slidesToScroll: 1,
		autoplaySpeed:2800,
		swipeToSlide: true,
	};
	return (
		<Slider {...settings}>
			<div className='slider_image_div' >
				<img className='slider_image' src='./images/slider3.jpg' />
			</div>
			<div className='slider_image_div'>
				<img className='slider_image' src='./images/slider5.jpg' />
			</div>
			<div className='slider_image_div'>
				<img className='slider_image' src='./images/bg1.jpg' />
			</div>
			<div className='slider_image_div'>
				<img className='slider_image' src='./images/slider2.jpg' />
			</div>
			<div className='slider_image_div'>
				<img className='slider_image' src='./images/slider4.jpg' />
			</div>
		</Slider>
	)
}

export default SliderHome
