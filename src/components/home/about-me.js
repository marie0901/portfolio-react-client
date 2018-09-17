// React
import React, {Component} from 'react';

// Bootstrap
import {LinkContainer} from 'react-router-bootstrap';
import {Grid, Row, Col, Button} from 'react-bootstrap';

// Components
import SocialButtons from '../social-buttons';

// Routing & Links
import {contactLink} from '../../links';

// Media files
import maria from '../../images/maria-pic.jpg';

// Strings
import {genericStrings, homeStrings} from '../../strings';

class AboutMe extends Component {
  render() {
    return (
      <div className='container-wrap'>
        <Grid>
          <Row id='about-sec'>
            <Col sm={4} md={3} className='person'>
              
              <div className='portrait-wrap'>
                <img src={maria} alt='Maria Maliarets' className='img-circle'/>
              </div>
            </Col>
            <Col sm={8} md={9} className='bio'>
              <blockquote className='cmd-line'>{homeStrings.bio}
                <br/>
                <br/>
                {homeStrings.contact}
                <span className='flashing'>{homeStrings.cursor}</span>
              </blockquote>
              <footer>
                <div className='social-wrap'>
                  <SocialButtons/>
                </div>
                <LinkContainer to={contactLink.url}>
                  <Button bsStyle='primary' className='btn-wide'>{homeStrings.connect}</Button>
                </LinkContainer>
              </footer>
            </Col>
          </Row>
        </Grid>
      </div>
    )
  }
}

export default AboutMe;
