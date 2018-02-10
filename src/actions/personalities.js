import contentful from '../lib/contentful';

/**
  * Get Personalities
  */
export function getPersonalities() {
  if (contentful === null) return () => new Promise(resolve => resolve());

  return dispatch => new Promise(resolve => contentful.getEntries({
    content_type: 'personality',
    include: 3,
  }).then((response) => {
    console.log('response', response);

    return resolve(dispatch({
      type: 'PERSONALITIES_REPLACE',
      data: response,
    }));
  })).catch(e => console.log(e));
}

/**
  * Set an Error Message
  */
export function setError(message) {
  return dispatch => new Promise(resolve => resolve(dispatch({
    type: 'PERSONALITIES_ERROR',
    data: message,
  })));
}
