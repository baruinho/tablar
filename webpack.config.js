var webpack = require('webpack');
var path = require('path');
module.exports = {
    context: path.resolve(__dirname, 'example'),
    entry: {
        javascript: ['babel-polyfill','./app.js'],
        html: './index.html'
    },
    output: {
        path: 'build',
        publicPath: 'build',
        filename: 'bundle.js'
    },
    devtool: 'cheap-module-eval-source-map',
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel',
                query: {
                    presets: ['es2015', 'react']
                }
            },
            { test: /\.css$/, loaders: [ 'style-loader', 'css-loader' ] },
            { test: /\.json$/, loader: 'json' },
            { test: /\.html$/, loader: "file?name=[name].[ext]" }
        ]
    },
    devServer: {
        inline: true,
        contentBase: './example',
        port: 3333,
        hot: true,
        progress: true
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ]
};