// filename dictates output
// path sets output directory to dist
const path = require("path");
// const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
// require generte sw class of workbox
const WorkboxPlugin = require("workbox-webpack-plugin");
// import inject manifest
const { InjectManifest } = require("workbox-webpack-plugin");
// import manifest
const WebpackPwaManifest = require('webpack-pwa-manifest');


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
    new WebpackPwaManifest({
      name: "Contact Cards Application",
      short_name: "Contact Cards",
      description: "Keep track of contacts!",
      background_color: "#7eb4e2",
      theme_color: "#7eb4e2",
      start_url: "./",
      publicPath: "./",
      icons: [
        {
          src: path.resolve("src/images/icon-manifest.png"),
          sizes: [96, 128, 192, 256, 384, 512],
          destination: path.join("assets", "icons"),
        },
        {
          src: path.resolve("src/images/icon-manifest.png"),
          size: "1024x1024",
          destination: path.join("assets", "icons"),
          purpose: "maskable",
        },
      ],
    }),
  ],
};
