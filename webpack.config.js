var path = require('path');

module.exports = {
	mode: 'none',
	entry: path.join(__dirname, '/src/index.js'),
	output: {
		path: path.join(__dirname, '/app/js'),
		filename: 'bundle.js'
	},
	devServer: {
		publicPath: '/js/',
        overlay: true,
        stats: {
            colors: true
        },
        hot: true
    },
	module: {
		rules: [
			{
				test: /\.jsx?$/,
				loader: 'babel-loader',
				exclude: /node_modules/,
				query: {
					cacheDirectory: true,
					presets: ['es2015', 'react'],
				}
			}
		]
	},

	resolve: {
		extensions: ['.js', '.jsx']
	},
	optimization: {
		minimize: false
	}
};