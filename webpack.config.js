module.exports = {
	mode: "development",
 	entry:{ 
		 app_bundle: './src/hydrated/App.js',
		 
	},
 	module: {
 		rules: [//These are the loaders
 			{test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
			{test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/ },			
		 ]
 	},
 	output: {
		filename: '[name].js',
		path: __dirname + '/public/bundles',
		publicPath: '/public'
	},
	watch: true,
	watchOptions: {
		ignored: ['files/**/*.js', 'node_modules', "pulse-editor"],
		//poll: 1000 // Check for changes every second
	},
 }