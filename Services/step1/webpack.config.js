var webpack = require('webpack');
var glob = require("glob");
    
module.exports = {
    context: __dirname,
    entry: {
        app: glob.sync("./app/**/*.js", {ignore: "./**/*.spec.js"}),
        vendor: ['angular', '@uirouter/angularjs', 'angular-mocks', 'angular-cookies']
    },
    output: {
        path: __dirname + '/js',
        filename: 'app.bundle.js'
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({ name: 'vendor', filename: 'vendor.bundle.js' })
    ],
    devtool: 'inline-source-map'
};
