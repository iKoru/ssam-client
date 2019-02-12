module.exports = {
  'presets': [
    [
      '@vue/app',
      {
        'useBuiltIns': 'entry',
        polyfills: ['filepond-polyfill', 'formdata-polyfill']
      },
      '@babel/preset-env',
    ]
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
