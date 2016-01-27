const webpack                       = require('webpack'),
	  path                          = require('path')
	  webpackTargetElectronRenderer = require('webpack-target-electron-renderer');


const config = {
	context: path.join(__dirname, "./src"),
	entry: {
		jsx: './index.jsx',
		html: './index.html',
		vendor: ['react']
	},
	output: {
		path: path.join(__dirname, './src/static'),
		filename: 'bundle.js'
	},
	module: {
		preLoaders: [
			{
				test: /\.js$/,
				include: path.join(__dirname, 'client'),
				exclude: /node_modules/,
				loader: 'eslint-loader'
			}
		],
		loaders: [
			{
				test: /\.html$/,
				loader: 'file?name=[name].[ext]'
			},
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				loaders: [
					'react-hot',
					'babel-loader'
				]
			},
			{
				test: /\.scss$/,
				loaders: ["style", "css?sourceMap", "sass?sourceMap"]
			},
			{
				test: /\.css$/,
				loaders: [
					'style-loader',
					'css-loader?modules&sourceMap&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]'
				]
			},
			{
				test: /\.(jpg|png|woff|woff2|eot|ttf|svg)$/, 
				loader: 'url-loader?limit=200000'
			}
		]
	},
	resolve: {
		extensions: ['', '.js', '.jsx']
	},
	plugins: [
		new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.bundle.js'),
		new webpack.DefinePlugin({
			'process.env': { NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development') }
		})
	],
	devServer: {
		contentBase: './src',
		hot: true
	},
	eslint: {
		configFile: '.eslintrc'
	}
}

config.target = webpackTargetElectronRenderer(config);

module.exports = config;