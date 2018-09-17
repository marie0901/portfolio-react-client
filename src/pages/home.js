// React
import React, {Component} from 'react';

// Redux
import {connect} from 'react-redux';
import {
  loadSliders,
  loadBlogPosts,
  loadProjects,
  loadLearningCourses
} from '../actions';

// Routing & Links
import {homeLink} from '../links';

// Components
import Slider from '../components/home/slider';
import AboutMe from '../components/home/about-me';
import LatestBlogPosts from '../components/home/latest-blog-posts';
import LatestProjects from '../components/home/latest-projects';
import CurrentCourse from '../components/home/current-course';

// Helpers
import {arrayFromObject, sortByDate} from '../utils/helpers';
import APIHelper from '../utils/api-helpers';


class Home extends Component {
  constructor(props) {
    super(props);
    this.fetchSliders();
    this.fetchBlogPosts();
    this.fetchProjects();
    this.fetchLearningCourses();
  }

  componentWillMount() {
    document.title = homeLink.documentTitle;
  }

  componentDidMount () {
    window.scrollTo(0, 0)
  }

  fetchSliders() {
    APIHelper.fetchSliders().then(sliders => {
      this.props.loadSliders({sliders});
    });
  }

  fetchBlogPosts() {
    APIHelper.fetchLatestBlogPosts().then(posts => {
      this.props.loadBlogPosts({posts});
    });
  }

  fetchProjects() {
    APIHelper.fetchLatestProjects().then(projects => {
      this.props.loadProjects({projects})
    })
  }

  fetchLearningCourses() {
    APIHelper.fetchCurrentCourses().then(courses => {
      this.props.loadLearningCourses({courses})
    })
  }

  generateCurrentCourse(course) {
    if (!course) {
      return null;
    }
    return (<CurrentCourse course={course}/>);
  }

  render() {
    const {sliders, blogPosts, projects, learning: {courses}} = this.props;

    const slidersArray = arrayFromObject(sliders).sort((s1, s2) => (s1.order - s2.order));
    const latestPostsArray = sortByDate(arrayFromObject(blogPosts), 'published_at').slice(0, 2);
    const latestProjectsArray = sortByDate(arrayFromObject(projects), 'released_at').slice(0, 3);
    const currentCourse = arrayFromObject(courses).filter(c => (c.current))[0]

    return [
      <Slider key='sliders' sliders={slidersArray}/>,
      <AboutMe key='about_me'/>,
      <LatestBlogPosts key='latest_blog_posts' posts={latestPostsArray}/>,
      <LatestProjects key='latest_projects' projects={latestProjectsArray}/>,
      <div key='current_course'>{this.generateCurrentCourse(currentCourse)}</div>
    ];
  }
}

function mapStateToProps({sliders, blogPosts, projects, learning}) {
  return {sliders, blogPosts, projects, learning}
}

function mapDispatchToProps(dispatch) {
  return {
    loadSliders: sliders => dispatch(loadSliders(sliders)),
    loadBlogPosts: posts => dispatch(loadBlogPosts(posts)),
    loadProjects: projects => dispatch(loadProjects(projects)),
    loadLearningCourses: courses => dispatch(loadLearningCourses(courses))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
