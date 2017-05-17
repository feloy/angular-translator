const ngtools = require('@ngtools/webpack');
module.exports = {
    entry: {
        main: './main.server.ts'
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
    target: 'node',
    output: {
        path: __dirname + '/dist',
        filename: '[name].js'
    },
    plugins: [
        new ngtools.AotPlugin({
            tsConfigPath: './tsconfig.json',
        })
    ],
    module: {
        rules: [
            {
                test: /\.ts$/,
                loaders: ['@ngtools/webpack', 'angular2-template-loader'],
            },
            {
                test: /\.(html|css)$/,
                loader: 'raw-loader'
            },
	    {
		test: /@angular(\\|\/)material/,
		loader: 'imports-loader',
		options: {
		    window: '>global',
		    'CSS': '>null',
		    navigator: '>{get userAgent(){ return \'Chrome\'; }}',
		    document: '>global.document',
		},
	    },
        ]
    }
}
