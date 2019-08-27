const path = require('path');

module.exports = {
    entry: './src/client/index.jsx',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist')
    }
};