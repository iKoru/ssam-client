module.exports = {
  root: true,
  env: {
    node: true,
    browser: true
  },
  'extends': [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  rules: {
    'no-console': 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'indent': [2, 2, { SwitchCase: 1 }],
    'semi': 0
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
