const path = require('path');
const webpack = require('webpack');

let config = {
    entry: "./app/index.js",

    output: {
        path: __dirname,
        publicPath: '/',
        filename: "bundle.js"
    },

    devServer: {
        contentBase: path.join(__dirname, "public"),
        compress: true
    },

    plugins: [
        new webpack.NoEmitOnErrorsPlugin()
    ],

    resolve: {
        extensions: ['.js', '.jsx']
    },

    module: {
        loaders: [
            {
                test: /\.(jsx|js)$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            },
            {
                test: /\.css$/,
                loader: "style-loader!css-loader"
            },
            {
                test: /\.(png|jpg)$/,
                loader: "url-loader?limit=100000"
            }
        ]
    }
};

config.devtool = 'source-map';

module.exports = config;
