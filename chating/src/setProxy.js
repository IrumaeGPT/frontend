
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: "http://sw.uos.ac.kr:8000",
      changeOrigin: true,
    })
  );
};