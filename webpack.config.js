const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
var autoprefixer = require('autoprefixer');


module.exports = {
	context: __dirname + '/src',
	entry: './index.js',
	devServer: {
		hot: false,
		inline: true,
		host: '0.0.0.0',
		port: 3000,
		contentBase: __dirname + '/public/'
	},
	plugins: [
		new webpack.NoEmitOnErrorsPlugin(),
		new ExtractTextPlugin('app.css'),
		new UglifyJSPlugin()
	],
	postcss: [
		autoprefixer({
			browsers: [
			'> 10%',
			'last 4 versions',
			'Firefox ESR',
			'not ie < 9', // React doesn't support IE8 anyway]
	  		]
	    })
  	],
	module:{
        loaders: [
            {
                test: /\.js$/,
                loaders: ['babel-loader?' + JSON.stringify({
                    cacheDirectory: true,
                    presets: ['es2015', 'env']
                })],
                exclude: /node_modules/
            },
			{
		      test: /\.css$/,
		      loaders: ['style-loader', 'css-loader', 'postcss-loader']
		    },
			{
		      test: /\.scss$/,
		      loaders: ['style-loader', 'css-loader', 'sass-loader', 'postcss-loader']
		    }
        ]
    },
	output: {
		path: __dirname + '/public',
		filename: 'bundle.js'
	}
};
