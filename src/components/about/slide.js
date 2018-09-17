// React
import React, {Component} from 'react';
import PropTypes from 'prop-types';

// Helpers
import {mediaFileUrl} from '../../utils/helpers';

class Slide extends Component {
  static propTypes = {
    slider: PropTypes.object.isRequired
  }

  render() {
    const {slider} = this.props;
    const style = {
      backgroundImage: `url('${mediaFileUrl(slider.image_url)}')`
    };
    return (
      <div className='slide-item' style={style}/>
    );
  };
}

export default Slide;