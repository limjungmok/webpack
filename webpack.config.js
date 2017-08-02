const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const autoprefixer = require('autoprefixer');

module.exports = {
	context: __dirname + '/src',
	devtool: 'source-map',
	entry: './index.js',
	devServer: {
		hot: false,
		inline: true,
		host: '0.0.0.0',
		port: 3000,
		contentBase: __dirname + '/public/'
	},
	output: {
		path: __dirname + '/public',
		filename: 'bundle.js'
	},
	module: {
        rules:[
			{
				test:/\.js$/,
				loader: 'babel-loader',
				options: {
					presets: ['es2015', 'env']
				},
				exclude: ['/node_modules']
			},
			{
		    test: /\.scss$/,
			  use: ExtractTextPlugin.extract({
				  fallback: 'style-loader',
				  use: 'css-loader?sourceMap!sass-loader?sourceMap'
				  })
		  	},
			{
	      test: /\.css$/,
			  loader: 'style-loader!css-loader?sourceMap!postcss-loader'
		    },
		]
    },
	plugins: [
		new webpack.NoEmitOnErrorsPlugin(),
		new webpack.LoaderOptionsPlugin({
			options: {
				postcss: [
					autoprefixer({browsers: ['last 2 version', '> 10%', 'ie 9']})
				]
			}
		}),
		new ExtractTextPlugin('app.css'),
		new UglifyJSPlugin(),
	],
	resolve: {
		modules: ['node_modules'],
		extensions: ['.js', '.json', '.jsx', '.css', '.scss']
	},
};
