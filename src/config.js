require('babel/polyfill');

const environment = {
  development: {
    isProduction: false
  },
  production: {
    isProduction: true
  }
}[process.env.NODE_ENV || 'development'];

module.exports = Object.assign({
  host: process.env.HOST || 'localhost',
  port: process.env.PORT,
  apiHost: process.env.APIHOST || 'localhost',
  apiPort: process.env.API_PORT || 7101,
  apiBaseUrl: process.env.APIBASE || 'http://192.168.178.21:7101',
  app: {
    title: 'SITREP',
    description: 'Training powered by VATC.',
    head: {
      titleTemplate: '%s - SITREP',
      meta: [
        {name: 'description', content: 'Training powered by VATC.'},
        {charset: 'utf-8'},
        {property: 'og:site_name', content: 'SITREP'},
        {property: 'og:locale', content: 'en_US'},
        {property: 'og:title', content: 'SITREP'},
        {property: 'og:description', content: 'All the modern best practices in one example.'},
        {property: 'og:card', content: 'summary'},
        {property: 'og:title', content: 'React Redux Example'},
        {property: 'og:image', content: 'https://react-redux.herokuapp.com/logo.jpg'},
        {property: 'og:image:width', content: '200'},
        {property: 'og:image:height', content: '200'}
      ]
    }
  },

}, environment);
