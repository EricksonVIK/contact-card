// filename dictates output
// path sets output directory to dist
const path = require("path");
// const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
// require generte sw class of workbox
const WorkboxPlugin = require("workbox-webpack-plugin");
// import inject manifest
const { InjectManifest } = require("workbox-webpack-plugin");

module.exports = {
  entry: "./src/js/index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  // rule to handle images and CSS bundle
  module: {
    rules: [
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [["@babel/preset-env", { targets: "defaults" }]],
          },
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      title: "Webpack Plugin",
    }),
    // new WorkboxPlugin.GenerateSW({
    //   // do not precache images
    //   exclude: [/\.(?:png|jpg|jpeg|svg)$/],

    //   // define runtime cacdh-first strategy
    //   handler: "CacheFirst",
    //   options: {
    //     // use custom cache name
    //     cacheName: "images",
    //     // only cache 1 images
    //     expiration: {
    //       maxEntries: 1,
    //     },
    //   },
    // }),
    new InjectManifest({
      swSrc: "./src/sw.js",
      swDest: "service-worker.js",
    }),
  ],
};
