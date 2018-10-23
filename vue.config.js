var webpack = require('webpack')

module.exports = {
    outputDir:'../client',
    configureWebpack: {
        plugins: [
            new webpack.ProvidePlugin({
                'window.Quill': 'quill/dist/quill.js', // image-resize-module requires window.Quill
                'Quill': 'quill/dist/quill.js'
            })
        ]
    }
}