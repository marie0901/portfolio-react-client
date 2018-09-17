// React
import React, {Component} from 'react';

// Redux
import {connect} from 'react-redux';
import {addProject, addLearningCourse, loadTechnologies} from '../actions';

// Bootstrap components
import {Row, Col} from 'react-bootstrap';

// Components
import Time from 'react-time';
import Loading from '../components/loading';
import Breadcrumb from '../components/breadcrumb';
import TagList from '../components/tag-list';
import TechnologyList from '../components/projects/technology-list';
import SocialShareButtons from '../components/social-share-buttons';
import Error from '../pages/error';

// Routing & Links
import {Link} from 'react-router-dom';
import {projectsLink, projectLink, courseLink} from '../links';

// Helpers
import APIHelper from '../utils/api-helpers';
import {mediaFileUrl, arrayFromObject} from '../utils/helpers';

// Media files
import githubIcon from '../images/social-gt.svg';
import websiteIcon from '../images/social-site.svg';

// Strings
import {projectsStrings, genericStrings} from '../strings';

class ProjectDetails extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
    this.fetchProject();
  }

  componentWillMount() {
    document.title = projectsLink.documentTitle;
  }

  componentDidMount () {
    window.scrollTo(0, 0)
  }

  fetchProject() {
    const {project_id} = this.props.match.params;
    APIHelper.fetchProject(project_id).then(project => {
      this.props.addProject({project});
      this.fetchProjectCourse(project.id);
      this.fetchProjectTechnologies(project.id);
    }).catch(error => {
      this.setState({error: error});
    });
  }

  fetchProjectCourse(project_id) {
    APIHelper.fetchProjectCourse(project_id).then(course => {
      this.props.addLearningCourse({course});
    });
  }

  fetchProjectTechnologies(project_id) {
    APIHelper.fetchProjectTechnologies(project_id).then(technologies => {
      this.props.loadTechnologies({technologies});
    });
  }

  generateProjectText(project) {
    if (project.html_text) {
      return [
        <br key='br'/>,
        <div key='text' dangerouslySetInnerHTML={{__html: project.html_text}}/>
      ];
    }
  }

generateProjectCourse(course) {
  if (!course) {
    return;
  }
  return (
    <div>
      <hr/>
      <h4>{projectsStrings.partOf}<Link to={courseLink(course).url}>{course.title}</Link></h4>
    </div>
  );
}

  generateProjectGithubLink(project) {
    if (project.github_url) {
      return (
        <li><Link to={project.github_url} title='See it on GitHub' target='_blank' rel='noopener'><img src={githubIcon} alt='See it on GitHub'></img></Link></li>
      );
    }
  }

  generateProjectWebsiteLink(project) {
    if (project.website_url) {
      return (
        <li><Link to={project.website_url} title='Visit the website' target='_blank' rel='noopener'><img src={websiteIcon} alt='Visit the website'></img></Link></li>
      );
    }
  }

  generateProjectLinks(project) {
    return (
      <div>
        <hr/>
        <h2>{projectsStrings.visitPage}</h2>
        <ul className='list-inline list-unstyled thb-icon-list selective-opacity transit-all'>
          {this.generateProjectGithubLink(project)}
          {this.generateProjectWebsiteLink(project)}
        </ul>
      </div>
    );
  }

  generateProjectLogo(project) {
    const logo = project.logo_url;
    if (logo) {
      return (<img src={mediaFileUrl(logo)} alt={project.name} className='img-responsive topic-cover edgy'/>);
    }
  }

  generateProjectTechnologies(project) {
    const technologies = project.technologies;
    if (technologies.length > 0) {
      return (
        <div className='project-tech-list'>
          <hr/>
          <TechnologyList ids={project.technologies}/>
          <hr/>
        </div>
      );
    }
  }

  generateProjectDetails(project, course, tags) {
    if (!project) {
      return <Loading/>;
    }
    document.title = projectLink(project).documentTitle;
    return (
      <article className='container topic'>
        <header className='inside-header row'>
          <h1 className='content-title col-sm-12'>{projectLink(project).title}</h1>
          <Breadcrumb links={[projectsLink, projectLink(project)]}/>
        </header>
        <div className='inside-body'>
          {this.generateProjectLogo(project)}
          <Row className='topic-meta edgy'>
            <Col sm={6} className='topic-date'>
              <span>{`${genericStrings.released}: `}</span>
              <Time value={project.released_at} format='D/M/YYYY'/>
            </Col>
            <Col sm={6} className='social-wrap'>
              <span>{genericStrings.share}</span>
              <SocialShareButtons url={window.location.href} title={project.name} summary={project.summary} tagIds={project.tags}/>
            </Col>
          </Row>
          <Row className='topic-content edgy'>
            <Col sm={12}>
              <div className='topic-free-code'>
                <h1>{project.name}</h1>
                <h3>{project.summary}</h3>
                {this.generateProjectTechnologies(project)}
                {this.generateProjectText(project)}
                {this.generateProjectCourse(course)}
                {this.generateProjectLinks(project)}
              </div>
            </Col>
          </Row>
        </div>
        <footer className='inside-footer edgy'>
          <TagList ids={project.tags} className='tag-list list-unstyled list-inline'/>
        </footer>
      </article>
    );
  }

  render() {
    const {error} = this.state;
    if (error) {
      return (
        <Error error={error}/>
      );
    }

    const {projects, learning, tags} = this.props;
    const {project_id} = this.props.match.params;

    var project;
    if (parseInt(project_id, 0)) { // get project by id
      project = projects[project_id]
    } else { // get project by url_name
      const projectsArray = arrayFromObject(projects);
      project = projectsArray.filter(p => (p.url_name === project_id))[0]
    }

    const courseArray = arrayFromObject(learning.courses);
    const course = courseArray.find(c => (c.id === project.course));

    return (
      <main className='container-wrap inside-content'>
        {this.generateProjectDetails(project, course, tags)}
      </main>
    )
  }
}

function mapStateToProps({projects, learning, technologies}) {
  return {projects, learning, technologies}
}

function mapDispatchToProps(dispatch) {
  return {
    addProject: project => dispatch(addProject(project)),
    addLearningCourse: course => dispatch(addLearningCourse(course)),
    loadTechnologies: technologies => dispatch(loadTechnologies(technologies))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectDetails);
