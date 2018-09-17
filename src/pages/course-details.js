// React
import React, {Component} from 'react';

// Redux
import {connect} from 'react-redux';
import {addLearningCourse, loadProjects} from '../actions';

// Bootstrap components
import {Row, Col} from 'react-bootstrap';

// Components
import Time from 'react-time';
import Breadcrumb from '../components/breadcrumb';
import TagList from '../components/tag-list';
import SocialShareButtons from '../components/social-share-buttons';
import Error from '../pages/error';
import Loading from '../components/loading';

// Routing & Links
import {Link} from 'react-router-dom';
import {learningLink, coursesLink, courseLink, projectLink} from '../links';

// Helpers
import APIHelper from '../utils/api-helpers';
import {mediaFileUrl, arrayFromObject} from '../utils/helpers';

// Media files
import placeholder from '../images/placeholders/course-placeholder.svg';

// Strings
import {genericStrings, learningStrings} from '../strings';

class CourseDetails extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
    this.fetchCourse();
  }

  componentWillMount() {
    document.title = coursesLink.documentTitle;
  }

  componentDidMount () {
    window.scrollTo(0, 0)
  }

  fetchCourse() {
    const {course_id} = this.props.match.params;
    APIHelper.fetchCourse(course_id).then(course => {
      this.props.addLearningCourse({course});
      this.fetchProjects(course.id);
    }).catch(error => {
      this.setState({error: error});
    });
  }

  fetchProjects(course_id) {
    APIHelper.fetchCourseProjects(course_id).then(projects => {
      this.props.loadProjects({projects});
    });
  }

  generateProjects(projects) {
    if (!projects.length) {
      return;
    }
    return (
      <Row className='topic-content edgy'>
        <Col sm={12}>
          <div className='topic-free-code'>
            <h2 className='projects-title' key='projects_title'>{learningStrings.projects}</h2>
            <ul>
              {projects.map(p => (<li key={p.id}><Link to={projectLink(p).url}>{p.name}</Link></li>))}
            </ul>
          </div>
        </Col>
      </Row>
    );
  }

  generateReview(review) {
    if (!review) {
      return;
    }
    return [
      <h2 key='review_title'>{learningStrings.review}</h2>,
      <p key='review_body'>{review}</p>
    ];
  }

  generateSummaryLink(url) {
    if (!url) {
      return;
    }
    return [
      <h2 key='summary_title'>{learningStrings.summary}</h2>,
      <Link key='summary_body' to={url} target='_blank' rel='noopener'>{url}</Link>
    ];
  }

  generateCourseDetails(course, projects, tags) {
    if (!course) {
      return <Loading/>;
    }
    document.title = courseLink(course).documentTitle;
    const logoUrl = course.logo_url ? mediaFileUrl(course.logo_url) : placeholder;
    return (
      <article className='container topic'>
        <header className='inside-header row'>
          <h1 className='content-title col-sm-12'>{courseLink(course).title}</h1>
          <p className='content-subtitle col-sm-12'>{courseLink(course).subtitle}</p>
          <Breadcrumb links={[learningLink, coursesLink, courseLink(course)]}/>
        </header>
        <div className='inside-body'>
          <Row className='topic-meta edgy'>
            <div className='col-sm-6 topic-date'>
              <span>{`${genericStrings.started}: `}</span>
              <Time value={course.started_at} format='D/M/YYYY'/>
            </div>
            <Col sm={6} className='social-wrap'>
              <span>{genericStrings.share}</span>
              <SocialShareButtons url={window.location.href} title={course.title} summary={course.subtitle} tagIds={course.tags}/>
            </Col>
          </Row>
          <Row className='topic-content edgy'>
            <Col sm={12}>
              <div className='thb-wrap'>
                <Link to={course.school_url} className='thb-title' target='_blank' rel='noopener'>
                  <img src={logoUrl} alt={course.title} className='img-responsive'/>
                  <span>{`${genericStrings.by} `}{course.school_name}</span>
                </Link>
                <p className='thb-link'>
                  <Link to={course.page_url} target='_blank' rel='noopener'><strong>{learningStrings.coursePage}</strong></Link>
                </p>
              </div>
              <div className='topic-free-code'>
                <h2>{genericStrings.description}</h2>
                <p>{course.description}</p>
                <br/>
                {this.generateReview(course.review)}
                {this.generateSummaryLink(course.summary_url)}
              </div>
            </Col>
          </Row>
          {this.generateProjects(projects)}
        </div>
        <footer className='inside-footer edgy'>
          <TagList ids={course.tags} className='tag-list list-unstyled list-inline'/>
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

    const {tags, projects} = this.props;
    const {courses} = this.props.learning ;
    const {course_id} = this.props.match.params;

    var course;
    if (parseInt(course_id, 0)) { // get course by id
      course = courses[course_id]
    } else { // get course by url_title
      const coursesArray = arrayFromObject(courses);
      course = coursesArray.filter(c => (c.url_title === course_id))[0]
    }

    const projectsArray = arrayFromObject(projects).filter(p => {

      if (!p.course) { return false; }
      return p.course === course.id;
    });

    return (
      <main className='container-wrap inside-content'>
        {this.generateCourseDetails(course, projectsArray, tags)}
      </main>
    )
  }
}

function mapStateToProps({learning, projects}) {
  return {learning, projects};
}

function mapDispatchToProps(dispatch) {
  return {
    addLearningCourse: course => dispatch(addLearningCourse(course)),
    loadProjects: projects => dispatch(loadProjects(projects))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CourseDetails);
