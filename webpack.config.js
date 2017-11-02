'use strict';


module.exports = {
    entry: './js',
    output: {
        filename: 'build.js',
        library: 'TodoList'
    },
    watch: true,
    watchOptions: {
        aggregateTimeout: 100
    },
    devtool: 'source-map',
    module: {
        loaders: [{
            test: /\.js$/,
            loader: 'babel-loader'
        }]

    }
};
