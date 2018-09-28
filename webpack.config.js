const config = {
  entry: {
    main: './src/index.js',
  },
  module: {
    rules: [{
      test: /\.jsx?$/,
      use: [{
        loader: 'babel-loader',
      }],
      exclude:
      /node_modules/,
    },  {
      test: /\.css$/,
      use: [ 'style-loader', 'css-loader' ],
      exclude:
      /node_modules/,
    }],
  },

  resolve: {
    extensions: ['.js', '.jsx'],
  },

  output: {
    filename: 'bundle.js',
    path: `${__dirname}/public/js`,
    publicPath: '/public/js',
  },
};

module.exports = config;
