const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target:
        process.env.MODE === 'DOCKER'
          ? 'http://demoserver:8080'
          : 'http://localhost:8080',
      changeOrigin: true,
    }),
  );
};
