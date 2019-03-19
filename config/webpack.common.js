const   webpack = require('webpack'),
        HtmlWebpackPlugin = require('html-webpack-plugin'),
        ExtractTextPlugin = require('extract-text-webpack-plugin'),
        helpers = require('./helpers');

module.exports = {
  entry: { // the entry-point files that define the bundles.
    'polyfills': './src/polyfills.ts',
    'vendor': './src/vendor.ts',
    'app': './src/main.ts'
  },
  resolve: { // how to resolve file names when they lack extensions.
    extensions: ['.ts', '.js']
  },
  module: {
    rules: [ // module is an object with rules for deciding how files are loaded.
        {
            test: /\.ts$/,
            loaders: [
                {
                    loader: 'awesome-typescript-loader',
                    options: { configFileName: helpers.root('src', 'tsconfig.json') }
                } , 'angular2-template-loader'
            ]
        },
        {
            test: /\.html$/,
            loader: 'html-loader'
        },
        {
            test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
            loader: 'file-loader?name=assets/[name].[hash].[ext]'
        },
        {
            test: /\.css$/,
            exclude: helpers.root('src', 'app'),
            loader: ExtractTextPlugin.extract({ fallbackLoader: 'style-loader', loader: 'css-loader?sourceMap' })
        },
        {
            test: /\.css$/,
            include: helpers.root('src', 'app'),
            loader: 'raw-loader'
        }
    ]
  },
  plugins: [
    // Workaround for angular/angular#11580
    new webpack.ContextReplacementPlugin(
      // The (\\|\/) piece accounts for path separators in *nix and Windows
      /angular(\\|\/)core(\\|\/)@angular/,
      helpers.root('./src'), // location of your src
      {} // a map of your routes
    ),
    new webpack.optimize.CommonsChunkPlugin({
      name: ['app', 'vendor', 'polyfills']
    }),
    new HtmlWebpackPlugin({
      template: 'src/index.html'
    })
  ]
};