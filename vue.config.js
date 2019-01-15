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
  transpileDependencies:[/node_modules[/\\\\]vuetify[/\\\\]/, /node_modules[/\\\\]vue-beautiful-chat[/\\\\]/, /node_modules[/\\\\]escape-goat[/\\\\]/, /node_modules[/\\\\]msgdown[/\\\\]/, /node_modules[/\\\\]quill-image-drop-module[/\\\\]/],
  chainWebpack: config => {
    config.module.rule('eslint').use('eslint-loader').options({
      fix: true
    })
    config.module.rule('vue')
      .use('vue-loader')
      .loader('vue-loader')
      .tap(options => Object.assign(options, {
        transformAssetUrls: {
          'v-img': ['src', 'lazy-src'],
          'v-card': 'src',
          'v-card-media': 'src',
          'v-responsive': 'src',
          'v-carousel-item': 'src',
          'v-parallax': 'src'
          // ...
        }
      }))
  }
}
