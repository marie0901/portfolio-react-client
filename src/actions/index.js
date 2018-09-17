// Action types
import * as types from './types';

/**
 * Action Creators
 */
export function loadBlogPosts({posts}) {
  return {type: types.LOAD_BLOG_POSTS, posts};
}

export function addBlogPost({post}) {
  return {type: types.ADD_BLOG_POST, post};
}

export function loadProjects({projects}) {
  return {type: types.LOAD_PROJECTS, projects};
}

export function addProject({project}) {
  return {type: types.ADD_PROJECT, project};
}

export function loadLearningBooks({books}) {
  return {type: types.LOAD_LEARNING_BOOKS, books};
}

export function addLearningBook({book}) {
  return {type: types.ADD_LEARNING_BOOK, book};
}

export function loadLearningSchools({schools}) {
  return {type: types.LOAD_LEARNING_SCHOOLS, schools};
}

export function addLearningSchool({school}) {
  return {type: types.ADD_LEARNING_SCHOOL, school};
}

export function loadLearningCourses({courses}) {
  return {type: types.LOAD_LEARNING_COURSES, courses};
}

export function addLearningCourse({course}) {
  return {type: types.ADD_LEARNING_COURSE, course};
}

export function loadLearningQuotes({quotes}) {
  return {type: types.LOAD_LEARNING_QUOTES, quotes};
}

export function addLearningQuote({quote}) {
  return {type: types.ADD_LEARNING_QUOTE, quote};
}

export function loadSliders({sliders}) {
  return {type: types.LOAD_SLIDERS, sliders};
}

export function addSlider({slider}) {
  return {type: types.ADD_SLIDER, slider};
}

export function loadTags({tags}) {
  return {type: types.LOAD_TAGS, tags};
}

export function addTag({tag}) {
  return {type: types.ADD_TAG, tag};
}

export function loadTechnologies({technologies}) {
  return {type: types.LOAD_TECHNOLOGIES, technologies};
}

export function loadAboutSliders({aboutSliders}) {
  return {type: types.LOAD_ABOUT_SLIDERS, aboutSliders};
}

export function addAboutSlider({aboutSlider}) {
  return {type: types.ADD_ABOUT_SLIDER, aboutSlider};
}