var path = require('path')
var webpack = require('webpack')

module.exports = {
    devtool: 'source-map',
    entry: [
        './src/main'
    ],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/static/'
    },
    node: {
        fs: 'empty'
    },
    module: {
        rules: [
            {
                test: /my_client\/.*\.js$/,
                use: 'imports-loader?define=>false'
            }
        ]
    }
}
