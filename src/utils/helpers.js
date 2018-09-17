import APIHelper from './api-helpers';

/**
 * Create an object from a given array
 */
export function objectFromArray(arr, key = 'id') {
  if (arr && arr.length) {
    return arr.reduce((v, i) => {
      v[i[key]] = i;
      return v;
    }, {});
  }
  return {};
}

/**
 * Create an array from a given object
 */
export function arrayFromObject(obj, key = 'id') {
  return Object.keys(obj).map(key => (obj[key]));
}

/**
 * return full url for a media file.
 */
export function mediaFileUrl(fileUrl) {
  return `${APIHelper.BASE_URL}${fileUrl}`
}


export function sortByDate(array, key) {
  return array.sort((o1, o2) => (new Date(o2[key]).getTime() - new Date(o1[key]).getTime()));
}
