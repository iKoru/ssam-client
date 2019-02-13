module.exports = {
  'presets': [
    [
      "@vue/app",
      {
        useBuiltIns:'entry'
        //polyfills: ['es7.object.entries', 'es6.promise.finally', 'es6.array.iterator', 'es6.symbol', 'web.dom.iterable', 'filepond-polyfill', 'formdata-polyfill']
      }
    ],
    '@babel/preset-env'
  ],
  'plugins': [
    [
      'transform-imports',
      {
        'vuetify': {
          'transform': 'vuetify/es5/components/${member}', // eslint-disable-line no-template-curly-in-string
          'preventFullImport': true
        }
      }
    ]
  ]
}
