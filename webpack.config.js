module.exports = {
    entry: './example/app.js',
    output: {
        path: './example/build',
        filename: 'bundle.js'
    },
    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel',
            query: {
                presets: ['es2015', 'react']
            }
        },{
            test: /\.css$/,
            loaders: [ 'style-loader', 'css-loader' ]
        },{ test: /\.json$/, loader: 'json' }]
    }
};