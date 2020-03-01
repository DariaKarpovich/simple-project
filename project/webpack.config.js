const path = require('path');

module.exports = {
    devServer: {
        port: 8080,
        compress: true,
        contentBase: path.join(__dirname, 'dist'),
        overlay: true,
    },
    stats: {
        colors: true
      }
}