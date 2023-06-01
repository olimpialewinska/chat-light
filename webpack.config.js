/* eslint-disable */
const { resolve, join } = require("path");
const { merge } = require("webpack-merge");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const createStyledComponentsTransformer =
  require("typescript-plugin-styled-components").default;
const TerserPlugin = require("terser-webpack-plugin");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
/* eslint-enable */

const APP_NAME = "ChatLight";
const INCLUDE = resolve(__dirname, "src");
const PORT = 4444;

const dev = process.env.DEV === "1";

process.env.NODE_ENV = dev ? "development" : "production";

const styledComponentsTransformer = createStyledComponentsTransformer({
  minify: !dev,
  displayName: dev,
});

const config = {
  mode: dev ? "development" : "production",

  devtool: dev ? "eval-source-map" : false,

  output: {
    path: resolve(__dirname, "build"),
    filename: "[name].bundle.js",
  },

  module: {
    rules: [
      {
        test: /\.(png|gif|jpg|woff2|ttf|svg)$/,
        include: INCLUDE,
        use: [
          {
            loader: "file-loader",
            options: {
              esModule: false,
              outputPath: "res",
            },
          },
        ],
      },
      {
        test: /\.tsx|ts$/,
        use: [
          {
            loader: "ts-loader",
            options: {
              experimentalWatchApi: dev,
              transpileOnly: true, // |dev| to throw CI when a ts error occurs
              getCustomTransformers: () => ({
                before: [styledComponentsTransformer],
              }),
            },
          },
        ],

        include: INCLUDE,
      },
    ],
  },

  node: {
    __dirname: false,
    __filename: false,
  },

  resolve: {
    modules: ["node_modules"],
    extensions: [".js", ".jsx", ".tsx", ".ts", ".json"],
    alias: {
      "~": INCLUDE,
    },
    plugins: [new TsconfigPathsPlugin()],
  },

  plugins: [new webpack.EnvironmentPlugin(["NODE_ENV"])],

  optimization: {
    minimizer: !dev
      ? [
          new TerserPlugin({
            extractComments: true,
            terserOptions: {
              ecma: 8,
              output: {
                comments: false,
              },
            },
            parallel: true,
          }),
        ]
      : [],
  },
};

function getConfig(...cfg) {
  return merge(config, ...cfg);
}

const getHtml = (name) => {
  return new HtmlWebpackPlugin({
    title: APP_NAME,
    template: "public/index.html",
    filename: `${name}.html`,
    chunks: [name],
  });
};

const applyEntries = (config, entries) => {
  for (const entry of entries) {
    config.entry[entry] = [`./src/renderer/${entry}`];
    config.plugins.push(getHtml(entry));
  }
};

const getBaseConfig = (name) => {
  const config = {
    plugins: [],

    output: {},

    entry: {},

    optimization: {
      runtimeChunk: {
        name: `runtime.${name}`,
      },
      splitChunks: {
        chunks: "all",
        maxInitialRequests: Infinity,
      },
    },
  };

  return config;
};

const appConfig = getConfig(getBaseConfig("app"), {
  target: "web",

  devServer: {
    port: PORT,
    hot: true,
    static: {
      directory: join(__dirname, "build"),
    },
  },

  plugins: [],
});

applyEntries(appConfig, ["index"]);

module.exports = appConfig;
