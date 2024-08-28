'use strict';

const path = require('path');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/js/main.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true, // Cleans the output directory before each build
  },
  devServer: {
    static: path.resolve(__dirname, 'dist'),
    port: 8080,
    hot: true,
    open: true, // Automatically opens the browser
  },
  plugins: [
    new HtmlWebpackPlugin({ template: './src/index.html' }),
  ],
  module: {
    rules: [
      {
        test: /\.scss$/, // SCSS loader
        use: [
          'style-loader', // Injects styles into DOM
          'css-loader',   // Translates CSS into CommonJS
          {
            loader: 'postcss-loader', // Processes CSS with PostCSS
            options: {
              postcssOptions: {
                plugins: [
                  autoprefixer(),
                ],
              },
            },
          },
          'sass-loader', // Compiles Sass to CSS
        ],
      },
      {
        test: /\.css$/, // CSS loader
        use: [
          'style-loader', // Injects styles into DOM
          'css-loader',   // Translates CSS into CommonJS
          {
            loader: 'postcss-loader', // Optional: Use PostCSS for additional processing
            options: {
              postcssOptions: {
                plugins: [
                  autoprefixer(),
                ],
              },
            },
          },
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i, // For image assets
        type: 'asset/resource',
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf)$/i, // For font assets
        type: 'asset/resource',
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.scss', '.css'], // Resolve CSS files as well
  },
};
