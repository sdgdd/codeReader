const {createProxyMiddleware} = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:3100',
      changeOrigin: true,
    }),
  );
  app.use(
    '/img',
    createProxyMiddleware({
      target: 'http://localhost:3300/img',
      changeOrigin: false,
    }),
  );
}