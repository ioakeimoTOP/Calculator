module.exports = {
  syntax: 'postcss-scss',
  plugins: [
    require('postcss-import'),
    require('postcss-advanced-variables'),
    require('postcss-nested'),
    require('autoprefixer')
  ],
};