module.exports = {
    build: {
      plugins: [
        new webpack.ProvidePlugin({
          'window.Quill': 'quill/dist/quill.js',
          'Quill': 'quill/dist/quill.js'
        })
      ]
    }
  }