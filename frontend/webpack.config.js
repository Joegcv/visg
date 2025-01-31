const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); //pour copier index dans dist

module.exports = {
  entry: './src/app.ts',
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  output: {
    filename: 'app.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true, //nettoie le dossier dist après chaque build
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html', // Assurez-vous que ce chemin est correct
      filename: 'index.html',
    }),
  ],

};
