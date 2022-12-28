const { createProxyMiddleware } = require('http-proxy-middleware');
require('dotenv').config();

module.exports = function (app) {
  if (process.env.NODE_ENV !== 'production') {
    app.use(
      '/api',
      createProxyMiddleware({
        target: 'http://localhost:8080',
        changeOrigin: true,
      }),
    );
  }
};
