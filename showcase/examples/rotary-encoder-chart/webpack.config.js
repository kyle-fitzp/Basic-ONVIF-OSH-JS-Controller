/* webpack.config.js */

var HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

var path = require('path');

module.exports = {
    // Tell Webpack which file kicks off our app.
    entry: path.resolve(__dirname,'rotary-encoder-chart.js'),
    // Tell Weback to output our bundle to ./dist/bundle.js
    output: {
        filename: 'bundle.rotary-encoder-chart.js',
        path: path.resolve(__dirname, 'dist')
    },
    // Tell Webpack which directories to look in to resolve import statements.
    // Normally Webpack will look in node_modules by default but since we’re overriding
    // the property we’ll need to tell it to look there in addition to the
    // bower_components folder.
    resolve: {
        modules: [
            path.resolve(__dirname, 'node_modules'),
        ],
        alias: {
            'osh-js': path.resolve(__dirname, '../../../source')
        }
    },
    // These rules tell Webpack how to process different module types.
    // Remember, *everything* is a module in Webpack. That includes
    // CSS, and (thanks to our loader) HTML.
    module: {
        rules: [
            {
                test: /\.(png|woff|woff2|eot|ttf|svg|jpg|gif)$/,
                use: [
                    'file-loader',
                ],
            },{
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },{
                test: /\.worker\.js$/,
                use: { loader: 'worker-loader'}
            }
        ]
    },
    node: {
        fs: 'empty'
    },
    // Enable the Webpack dev server which will build, serve, and reload our
    // project on changes.
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 9000,
        hot: true,
        index: 'rotary-encoder-chart.html'
    },
    devtool: 'source-map',
    plugins: [
        /**
         * All files inside webpack's output.path directory will be removed once, but the
         * directory itself will not be. If using webpack 4+'s default configuration,
         * everything under <PROJECT_DIR>/dist/ will be removed.
         * Use cleanOnceBeforeBuildPatterns to override this behavior.
         *
         * During rebuilds, all webpack assets that are not used anymore
         * will be removed automatically.
         *
         * See `Options and Defaults` for information
         */
        new CleanWebpackPlugin(),
        // This plugin will generate an index.html file for us that can be used
        // by the Webpack dev server. We can give it a template file (written in EJS)
        // and it will handle injecting our bundle for us.
        new HtmlWebpackPlugin({
            filename: 'rotary-encoder-chart.html',
            template: path.resolve(__dirname, 'rotary-encoder-chart.html')
        })
    ]
};
