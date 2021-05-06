module.exports = {
  publicPath: '/cms-service-web/',
  // publicPath: process.env.NODE_ENV==='production'?'./':'/',
  assetsDir:'static',
  lintOnSave: process.env.NODE_ENV !== 'production',//生产构建下eslint-loader禁止使用
}
