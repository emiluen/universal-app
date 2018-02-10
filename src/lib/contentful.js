import contentfulConfig from '../constants/contentful';

// Regular createClient function does not work in react native, so prompt web version
// https://github.com/contentful/contentful.js/issues/191
const { createClient } = require('contentful/dist/contentful.browser.min.js');

const {
  SPACE_ID,
  ACCESS_TOKEN,
} = contentfulConfig;

export default createClient({
  space: SPACE_ID,
  accessToken: ACCESS_TOKEN,
});
