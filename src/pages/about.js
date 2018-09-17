// React
import React, {Component} from 'react';

// Bootstrap components
import {Row, Col} from 'react-bootstrap';

// Components
import Breadcrumb from '../components/breadcrumb';
import Slider from '../components/about/slider';

// Redux
import {connect} from 'react-redux';
import {loadAboutSliders} from '../actions';

// Routing & Links
import {aboutLink} from '../links';

// Helpers
import {arrayFromObject} from '../utils/helpers';
import APIHelper from '../utils/api-helpers';

// Strings
import {aboutStrings} from '../strings';

class About extends Component {
  constructor(props) {
    super(props);
    this.fetchSliders();
  }

  componentWillMount() {
    document.title = aboutLink.documentTitle;
  }

  componentDidMount () {
    window.scrollTo(0, 0)
  }

  fetchSliders() {
    APIHelper.fetchAboutSliders().then(aboutSliders => {      
      this.props.loadAboutSliders({aboutSliders});
    });
  }

  render() {
    const {aboutSliders} = this.props;

    const slidersArray = arrayFromObject(aboutSliders).sort((s1, s2) => (s1.order - s2.order));

    return (
      <main className='container-wrap inside-content'>
        <article className='container topic'>
          <header className='inside-header row'>
            <h1 className='content-title col-sm-12'>{aboutLink.title}</h1>
            <Breadcrumb links={[aboutLink]}/>
          </header>
          <div className='inside-body'>
          <Slider key='sliders' sliders={slidersArray}/>
            <Row className='topic-content about'>
              <Col sm={12}>
                <h1>{aboutStrings.title}<span role='img' aria-label={aboutStrings.emojiTitle}>{aboutStrings.emoji}</span></h1>
                <br/>
                <p dangerouslySetInnerHTML={{__html: aboutStrings.text}}/>
              </Col>
            </Row>
          </div>
        </article>
      </main>
    );
  }
}

function mapStateToProps({aboutSliders}) {
  return {aboutSliders}
}

function mapDispatchToProps(dispatch) {
  return {
    loadAboutSliders: aboutSliders => dispatch(loadAboutSliders(aboutSliders))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(About);