// React
import React, {Component} from 'react';

// Redux
import {connect} from 'react-redux';
import {loadProjects} from '../actions';

// Bootstrap components
import {Row, Col} from 'react-bootstrap';

// Components
import Breadcrumb from '../components/breadcrumb';
import ProjectCell from '../components/projects/project-cell';
import Loading from '../components/loading';

// Routing & Links
import {projectsLink} from '../links';

// Helpers
import {arrayFromObject} from '../utils/helpers';
import APIHelper from '../utils/api-helpers';

class ProjectListing extends Component {
  constructor(props) {
    super(props);
    this.fetchProjects();
  }

  componentWillMount() {
    document.title = projectsLink.documentTitle;
  }

  componentDidMount () {
    window.scrollTo(0, 0)
  }

  fetchProjects() {
    APIHelper.fetchProjects().then(projects => {
      this.props.loadProjects({projects})
    })
  }

  generateBody(projects) {
    if (projects.length === 0 ) {
      return <Loading/>;
    } else {
      return (
        <Row>
          <Col sm={12}>
            <ul className='list-unstyled list-inline row thumbnails-hfixed transit-all'>
              {projects.map(p => (<ProjectCell key={p.id} project={p}/>))}
            </ul>
          </Col>
        </Row>
      )
    }
  }

  render() {
    const {projects} = this.props;
    const projectsArray = arrayFromObject(projects)
    const sortedProjects = projectsArray.sort((p1, p2) => (new Date(p2.released_at).getTime() - new Date(p1.released_at).getTime()));

    return (
      <main className='container-wrap inside-content'>
        <section className='container'>
          <header className='inside-header row'>
            <h1 className='content-title col-sm-12'>{projectsLink.title}</h1>
            <Breadcrumb links={[projectsLink]}/>
          </header>
          <div className='inside-body'>
            {this.generateBody(sortedProjects)}
          </div>
        </section>
      </main>
    )
  }
}

function mapStateToProps({projects}) {
  return {projects}
}

function mapDispatchToProps(dispatch) {
  return {
    loadProjects: projects => dispatch(loadProjects(projects))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectListing);
