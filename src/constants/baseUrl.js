const devUrl = 'http://localhost:3001/';
const prodUrl = devUrl;

export default process.env.NODE_ENV === 'development' ? devUrl : prodUrl;
