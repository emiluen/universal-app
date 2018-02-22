/**
 * React Native Starter Kit - Firebase Cloud Functions
 * - A collection of example cloud functions to use with this project
 *
 * React Native Starter App
 * https://github.com/mcnamee/react-native-starter-kit
 */

const functions = require('firebase-functions');
const admin = require('firebase-admin');

/**
 * GCS require admin credentials: https://github.com/firebase/functions-samples/issues/326
 */
const gcs = require('@google-cloud/storage')({ keyFilename: 'service-account-credentials.json' });
const { spawn } = require('child-process-promise');
const path = require('path');
const os = require('os');
const fs = require('fs');
const mkdirp = require('mkdirp-promise');

admin.initializeApp(functions.config().firebase);

// Max height and width of the thumbnail in pixels.
const THUMB_MAX_HEIGHT = 200;
const THUMB_MAX_WIDTH = 200;
// Thumbnail prefix added to file names.
const THUMB_PREFIX = 'thumb_';

/**
 * When an image is uploaded in the Storage bucket We generate a thumbnail automatically using
 * ImageMagick.
 * After the thumbnail has been generated and uploaded to Cloud Storage,
 * we write the public URL to the Firebase Realtime Database.
 */
exports.generateThumbnail = functions.storage.object().onChange((event) => {
  // File and directory paths.
  const filePath = event.data.name;
  const { contentType } = event.data; // This is the image Mimme type
  const fileDir = path.dirname(filePath);
  const fileName = path.basename(filePath);
  const thumbFilePath = path.normalize(path.join(fileDir, `${THUMB_PREFIX}${fileName}`));
  const tempLocalFile = path.join(os.tmpdir(), filePath);
  const tempLocalDir = path.dirname(tempLocalFile);
  const tempLocalThumbFile = path.join(os.tmpdir(), thumbFilePath);

  // Exit if this is triggered on a file that is not an image.
  if (!contentType.startsWith('image/')) {
    console.log('This is not an image.');
    return null;
  }

  // Exit if the image is already a thumbnail.
  if (fileName.startsWith(THUMB_PREFIX)) {
    console.log('Already a Thumbnail.');
    return null;
  }

  // Exit if this is a move or deletion event.
  if (event.data.resourceState === 'not_exists') {
    console.log('This is a deletion event.');
    return null;
  }

  // Cloud Storage files.
  const bucket = gcs.bucket(event.data.bucket);
  const file = bucket.file(filePath);
  const thumbFile = bucket.file(thumbFilePath);
  const metadata = { contentType };

  // Create the temp directory where the storage file will be downloaded.
  return mkdirp(tempLocalDir)
    .then(() =>
      // Download file from bucket.
      file.download({ destination: tempLocalFile }))
    .then(() => {
      console.log('The file has been downloaded to', tempLocalFile);
      // Generate a thumbnail using ImageMagick.
      return spawn('convert', [tempLocalFile, '-thumbnail', `${THUMB_MAX_WIDTH}x${THUMB_MAX_HEIGHT}>`, tempLocalThumbFile], { capture: ['stdout', 'stderr'] });
    })
    .then(() => {
      console.log('Thumbnail created at', tempLocalThumbFile);
      // Uploading the Thumbnail.
      return bucket.upload(tempLocalThumbFile, { destination: thumbFilePath, metadata });
    })
    .then(() => {
      console.log('Thumbnail uploaded to Storage at', thumbFilePath);
      // Once the image has been uploaded delete the local files to free up disk space.
      fs.unlinkSync(tempLocalFile);
      fs.unlinkSync(tempLocalThumbFile);
      // Get the Signed URLs for the thumbnail and original image.
      const config = {
        action: 'read',
        expires: '03-01-2500',
      };
      return Promise.all([
        thumbFile.getSignedUrl(config),
        file.getSignedUrl(config),
      ]);
    })
    .then((results) => {
      console.log('Got Signed URLs.');
      const thumbResult = results[0];
      const originalResult = results[1];
      const thumbFileUrl = thumbResult[0];
      const fileUrl = originalResult[0];
      console.log('thumbFileUrl', thumbFileUrl);
      console.log('fileUrl', fileUrl);
      // Add the URLs to the Database
      // return admin.database().ref('images').push({path: fileUrl, thumbnail: thumbFileUrl});
      // return admin.database().ref(`users/${fileName}`).update({ imageUrl: thumbFileUrl });
      return admin.database().ref(`users/${fileName}/imageUrl`).set(thumbFileUrl);
    })
    .then(() => console.log('Thumbnail URLs saved to database.'));
});

/**
  * Listens for updates to /users/:userId and creates an
  * full name attribute based on the first and last names
  */
/*
exports.cleanUserData = functions.database.ref('/users/{userId}').onWrite((event) => {
  console.log('Making Full Name for UserID:', event.params.userId);

  // Get the first and last names
  const firstName = event.data._newData.firstName || '';
  const lastName = event.data._newData.lastName || '';

  const userData = {
    fullName: `${firstName} ${lastName}`,
  };

  // Add Role if it doesn't already exist
  if (event && event.data && event.data._data && !event.data._newData.role) {
    userData.role = 'user';
  }

  return event.data.ref.update(userData);
});
*/

/**
  * Listens for user deletion and
  * - deletes the user's reference in the database
  */
/*
exports.deleteUserData = functions.auth.user().onDelete((event) => {
  const { uid } = event.data;
  return admin.database().ref(`/users/${uid}`).remove();
});
*/
