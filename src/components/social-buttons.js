// React
import React, {Component} from 'react';

// Routing & Links
import {Link} from 'react-router-dom';
import {
  github,
  linkedin
} from '../social-links';

class SocialButtons extends Component {
  render() {
    return (
      <ul className='list-unstyled inline-list'>
        <li key={0}>
          <Link to={github.url} target='_blank' rel='noopener'>
            <img src={github.icon} alt={github.name}/>
          </Link>
        </li>
        <li key={1}>
          <Link to={linkedin.url} target='_blank' rel='noopener'>
            <img src={linkedin.icon} alt={linkedin.name}/>
          </Link>
        </li>
      </ul>
    );
  };
}

export default SocialButtons;
