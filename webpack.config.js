const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

const { outDir } = require("./package.json");
const outputPath = path.join(__dirname, outDir);

console.log(`Output path: ${outputPath}`);

module.exports = {
  entry: ["babel-polyfill", "./src/client/index.js"],
  output: {
    path: outputPath,
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg)$/,
        loader: "url-loader?limit=100000"
      }
    ]
  },
  resolve: {
    extensions: ["*", ".js", ".jsx"]
  },
  devServer: {
    port: 3000,
    open: true,
    proxy: {
      "/api": "http://localhost:8080"
    },
    contentBase: "public"
  },
  plugins: [
    new webpack.DefinePlugin({
      SERVICE_URL: JSON.stringify(process.env.NODE_ENV === "development" ? "http://localhost:8080" : "/.netlify/functions/serverless")
    }),
    new CleanWebpackPlugin([outDir]),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      favicon: "./public/favicon.ico"
    }),
    new CopyWebpackPlugin([{ from: "./public/*.txt", flatten: true }])
  ]
};
