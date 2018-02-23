import { Firebase, FirebaseRef } from '../lib/firebase';

/**
  * Get a Public Profile's name if public
  */
function getName(dispatch, UID) {
  if (Firebase === null) return () => new Promise(resolve => resolve());

  if (!UID) return false;

  const ref = FirebaseRef.child(`users/users/${UID}/firstName`);

  return ref.on('value', (snapshot) => {
    const name = snapshot.val() || '';

    return dispatch({
      type: 'PUBLIC_PROFILE_PUBLICNAME_UPDATE',
      data: name,
    });
  });
}

/**
  * Get a Public Profile's image if public
  */
function getImage(dispatch, UID) {
  if (Firebase === null) return () => new Promise(resolve => resolve());

  if (!UID) return false;

  const ref = FirebaseRef.child(`users/users/${UID}/imageUrl`);

  return ref.on('value', (snapshot) => {
    const name = snapshot.val() || '';

    return dispatch({
      type: 'PUBLIC_PROFILE_PUBLICIMAGE_UPDATE',
      data: name,
    });
  });
}

/**
  * Get a Public Profile's public personalities
  */
function getPersonalities(dispatch, UID) {
  if (Firebase === null) return () => new Promise(resolve => resolve());

  if (!UID) return false;

  const ref = FirebaseRef.child(`users/userObjects/personalities/${UID}`);

  return ref.orderByChild('isPrivate').equalTo(false) // TODO: false || null
    .on('value', (snapshot) => {
      const personalities = snapshot.val() || [];

      return dispatch({
        type: 'PUBLIC_PROFILE_PERSONALITIES_UPDATE',
        data: personalities,
      });
    });
}

/**
  * Get a Public Profile's Details
  */
export function getPublicProfile(UID) {
  if (Firebase === null) return () => new Promise(resolve => resolve());

  if (!UID) return false;

  return dispatch => new Promise(async (resolve) => {
    await getName(dispatch, UID);
    await getImage(dispatch, UID);
    await getPersonalities(dispatch, UID);
    resolve();
  })
    .catch(async err => console.log('error', err));
}

/**
  * Set an Error Message
  */
export function setError(message) {
  return dispatch => new Promise(resolve => resolve(dispatch({
    type: 'PUBLIC_PROFILE_ERROR',
    data: message,
  })));
}
