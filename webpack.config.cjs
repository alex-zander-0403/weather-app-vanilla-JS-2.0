const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

const isProduction = process.env.NODE_ENV === "production";

module.exports = {
  entry: "./src/main.js",
  mode: isProduction ? "production" : "development",
  // mode: "development",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
    clean: true,
  },
  module: {
    rules: [
      { test: /\.css$/, use: [MiniCssExtractPlugin.loader, "css-loader"] },
      { test: /\.(png|svg|jpg|jpeg|gif)$/i, type: "asset/resource" },
      { test: /\.(woff|woff2|eot|ttf|otf)$/i, type: "asset/resource" },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
    new CopyPlugin({
      patterns: [{ from: "./src/public", to: "public/" }],
    }),
    new MiniCssExtractPlugin(),
  ],
  optimization: {
    minimizer: ["...", new CssMinimizerPlugin()],
  },
  devtool:
    process.env.NODE_ENV === "production" ? "hidden-source-map" : "source-map",
};
