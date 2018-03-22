var webpack = require('webpack');
module.exports = {
    context: __dirname,
    entry: {
        app: './index.js',
        vendor: ['angular', '@uirouter/angularjs', 'angular-mocks', 'angular-cookies']
    },
    output: {
        path: __dirname + '/js',
        filename: 'app.bundle.js'
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({ name: 'vendor', filename: 'vendor.bundle.js' })
    ]
};