var webpack = require('webpack')

module.exports = {
  outputDir: '../client',

  configureWebpack: {
    plugins: [
      new webpack.ProvidePlugin({
        'window.Quill': 'quill/dist/quill.js', // image-resize-module requires window.Quill
        'Quill': 'quill/dist/quill.js'
      })
    ],
    devServer: {
      compress: true,
      disableHostCheck: true,
      port: 8082
    }
  },
  chainWebpack: config => {
    config.module.rule('eslint').use('eslint-loader').options({
      fix: true
    })
  }
}
