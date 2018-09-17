// React
import React, {Component} from 'react';

// Redux
import {connect} from 'react-redux';
import {LOAD_TAGS} from './actions/types';
import {loadTags} from './actions';

// Helmet
import {Helmet} from "react-helmet";

// Components
import NavigationBar from './components/navigation-bar';
import Footer from './components/footer';

// Routing & Links
import {withRouter} from 'react-router-dom';
import Routes from './routes';

// Stylesheets
import './styles/bootstrap.css';
import './styles/app.css';

// Strings
import {genericStrings, homeStrings} from './strings';
import {DOMAIN_NAME} from './data/constants';

// Helpers
import APIHelper from './utils/api-helpers';

class App extends Component {
  constructor(props) {
    super(props);
    this.fetchTags();
  }

  fetchTags() {
    APIHelper.fetchTags().then(tags => {
      this.props.loadTags({type: LOAD_TAGS, tags});
    });
  }

  render() {
    return (
      <div id="main" className="mariamalia">
        <Helmet>
          <meta name="twitter:site" content={genericStrings.twitter}/>
          <meta name="twitter:creator" content={genericStrings.twitter}/>

          <meta name="twitter:card" content="summary_large_image"/>
          <meta name="twitter:title" content={genericStrings.name}/>
          <meta name="twitter:description" content={genericStrings.title}/>

          <meta property="og:url" content={DOMAIN_NAME}/>
          <meta property="og:title" content={genericStrings.name}/>
          <meta property="og:description" content={genericStrings.title}/>

          <meta name="description" content={homeStrings.bio}/>
          <meta name="keyword" content={genericStrings.keyword}/>

          <meta name="apple-mobile-web-app-title" content={genericStrings.name}/>
        </Helmet>
        <NavigationBar/>
        <Routes/>
        <Footer/>
      </div>
    );
  }
}

function mapStateToProps({tags}) {
  return {tags}
}

function mapDispatchToProps(dispatch) {
  return {
    loadTags: tags => dispatch(loadTags(tags))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
