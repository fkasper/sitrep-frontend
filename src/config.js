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
  apiHost: process.env.APIHOST || 'graph.sitrep-vatcinc.com',
  apiPort: process.env.API_PORT || 443,
  apiProtocol: process.env.API_PROTO || 'https',
  apiBaseUrl: process.env.APIBASE || 'https://graph.sitrep-vatcinc.com',
  apiPrefix: '',
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
        {property: 'og:card', content: 'summary'}
      ]
    }
  },

}, environment);
