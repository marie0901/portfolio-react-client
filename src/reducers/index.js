// Redux
import {combineReducers} from 'redux'

// Action types
import * as types from '../actions/types';

// Helpers
import {objectFromArray} from '../utils/helpers'

/**
 * Blog Posts Reducers
 */
function blogPosts(state = {}, action) {
  const {posts, post} = action;

  switch (action.type) {
    // load posts to store
    case types.LOAD_BLOG_POSTS:
      return {
        ...state,
        ...objectFromArray(posts)
      };
    // add a post
    case types.ADD_BLOG_POST:
      return {
        ...state,
        [post.id]: post
      };
    // any other action: return all posts
    default:
      return state;
  }
}

/**
 * Projects Reducers
 */
function projects(state = {}, action) {
  const {projects, project} = action;

  switch (action.type) {
    // load projectss to store
    case types.LOAD_PROJECTS:
      return {
        ...state,
        ...objectFromArray(projects)
      };
    // add a project
    case types.ADD_PROJECT:
      return {
        ...state,
        [project.id]: project
      };
    // any other action: return all projectss
    default:
      return state;
  }
}

/**
 * Learning Books Reducers
 */
function books(state = {}, action) {
  const {books, book} = action;

  switch (action.type) {
    // load books to store
    case types.LOAD_LEARNING_BOOKS:
      return {
        ...state,
        ...objectFromArray(books)
      };
    // add a book
    case types.ADD_LEARNING_BOOK:
      return {
        ...state,
        [book.id]: book
      };
    // any other action: return all books
    default:
      return state;
  }
}

/**
 * Learning Schools Reducers
 */
function schools(state = {}, action) {
  const {schools, school} = action;

  switch (action.type) {
    // load schools to store
    case types.LOAD_LEARNING_SCHOOLS:
      return {
        ...state,
        ...objectFromArray(schools)
      };
    // add a school
    case types.ADD_LEARNING_SCHOOL:
      return {
        ...state,
        [school.id]: school
      };
    // any other action: return all schools
    default:
      return state;
  }
}

/**
 * Learning Courses Reducers
 */
function courses(state = {}, action) {
  const {courses, course} = action;

  switch (action.type) {
    // load courses to store
    case types.LOAD_LEARNING_COURSES:
      return {
        ...state,
        ...objectFromArray(courses)
      };
    // add a course
    case types.ADD_LEARNING_COURSE:
      return {
        ...state,
        [course.id]: course
      };
    // any other action: return all courses
    default:
      return state;
  }
}

/**
 * Learning Quotes Reducers
 */
function quotes(state = {}, action) {
  const {quotes, quote} = action;
  switch (action.type) {
    // load quotes to store
    case types.LOAD_LEARNING_QUOTES:
      return {
        ...state,
        ...objectFromArray(quotes)
      };
    // add a quote
    case types.ADD_LEARNING_QUOTE:
      return {
        ...state,
        [quote.id]: quote
      };
    // any other action: return all quotes
    default:
      return state;
  }
}

// Combine all learning reducers into a learning reducer
const learning = combineReducers({books, schools, courses, quotes});

/**
 * Sliders Reducers
 */
function sliders(state = {}, action) {
  const {sliders, slider} = action;

  switch (action.type) {
    // load sliders to store
    case types.LOAD_SLIDERS:
      return {
        ...state,
        ...objectFromArray(sliders)
      };
    // add a slider
    case types.ADD_SLIDER:
      return {
        ...state,
        [slider.id]: slider
      };
    // any other action: return all sliders
    default:
      return state;
  }
}

/**
 * About Sliders Reducers
 */
function aboutSliders(state = {}, action) {
  const {aboutSliders, aboutSlider} = action;

  switch (action.type) {
    // load about sliders to store
    case types.LOAD_ABOUT_SLIDERS:
      return {
        ...state,
        ...objectFromArray(aboutSliders)
      };
    // add an about slider
    case types.ADD_ABOUT_SLIDER:
      return {
        ...state,
        [aboutSlider.id]: aboutSlider
      };
    // any other action: return all about sliders
    default:
      return state;
  }
}

/**
 * Tags Reducers
 */
function tags(state = {}, action) {
  const {tags, tag} = action;

  switch (action.type) {
    // load tags to store
    case types.LOAD_TAGS:
      return {
        ...state,
        ...objectFromArray(tags)
      };
    // add a tag
    case types.ADD_TAG:
      return {
        ...state,
        [tag.id]: tag
      };
    // any other action: return all tags
    default:
      return state;
  }
}

/**
 * Technologies Reducers
 */
function technologies(state = {}, action) {
  const {technologies} = action;

  switch (action.type) {
    // load technologies to store
    case types.LOAD_TECHNOLOGIES:
      return {
        ...state,
        ...objectFromArray(technologies)
      };
    // any other action: return all tags
    default:
      return state;
  }
}

// export all above reducers combined
export default combineReducers({blogPosts, projects, learning, sliders, tags, technologies, aboutSliders});
