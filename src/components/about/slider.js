// React
import React, {Component} from 'react';
import PropTypes from 'prop-types';

// Components
import Slide from './slide';

// Slick Slider
import ReactSlider from 'react-slick';

class Slider extends Component {
  static propTypes = {
    sliders: PropTypes.array.isRequired
  }

  generateSlider(sliders) {
    const settings = {
      dots: true,
      infinite: true,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 3500,
    };

    if (sliders.length > 0) {
      return (
        <ReactSlider {...settings}>
          {sliders.map(s => (<div key={s.id}><Slide slider={s}/></div>))}
        </ReactSlider>
      )
    }
  }

  render() {
    const {sliders} = this.props;
    return (
      <div className='flat-bullets about'>
        {this.generateSlider(sliders)}
      </div>
    );
  };
}

export default Slider;
