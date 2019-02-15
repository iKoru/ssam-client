var webpack = require('webpack')
const fs = require('fs')
module.exports = {
  outputDir: 'dist',

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
      port: 8082,
      https: process.env.IS_LOCAL?{
        key:fs.readFileSync('./localhost.key'),
        cert:fs.readFileSync('./localhost.crt')
      }:undefined
    },
    loader: {
      test: /\.styl$/,
      loader: ['style-loader', 'css-loader', 'stylus-loader']
    }
  },

  //publicPath: process.env.NODE_ENV === 'development'?'/':'/',   
  transpileDependencies: [/node_modules[/\\\\]vuetify[/\\\\]/, /node_modules[/\\\\]escape-goat[/\\\\]/, /node_modules[/\\\\]msgdown[/\\\\]/, /node_modules[/\\\\]quill-image-drop-module[/\\\\]/, /node_modules[/\\\\]quill-magic-url[/\\\\]/, /node_modules[/\\\\]vue-beautiful-chat[/\\\\]/, /node_modules[/\\\\]formdata-polyfill[/\\\\]/],
  
  productionSourceMap:false,
  chainWebpack: config => {
    //config.plugin('workbox')
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
  },

  pwa: {
    // configure the workbox plugin
    workboxPluginMode: 'InjectManifest',
    workboxOptions: {
      // swSrc is required in InjectManifest mode.
      swSrc: 'public/service-worker.js',
      // ...other Workbox options...
    },
    name: 'Pedagy',
    msTileColor: '#3F51B5'
  },

  pluginOptions: {
    s3Deploy: {
      registry: undefined,
      awsProfile: 'default',
      region: 'northeast-2',
      bucket: 'www.pedagy.com',
      createBucket: false,
      staticHosting: true,
      staticIndexPage: 'index.html',
      staticErrorPage: 'index.html',
      assetPath: 'dist',
      assetMatch: '**',
      deployPath: '/',
      gzip: true,
      acl: 'public-read',
      pwa: true,
      pwaFiles: 'service-worker.js',
      enableCloudfront: false,
      uploadConcurrency: 5,
      pluginVersion: '3.0.0'
    }
  }
}
