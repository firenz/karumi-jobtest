const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

const basePath = __dirname;

module.exports = {
  context: path.join(basePath, "src"),
  resolve: {
    alias: {
      core: path.resolve(__dirname, "./src/core"),
      router: path.resolve(__dirname, "./src/router"),
      pods: path.resolve(__dirname, "./src/pods"),
      layouts: path.resolve(__dirname, "./src/layouts"),
      pages: path.resolve(__dirname, "./src/pages")
    },
    extensions: [".js", ".ts", ".jsx", ".tsx"]
  },
  entry: {
    app: [
      "regenerator-runtime/runtime",
      "./main.tsx"
    ],
    appStyles: ["./sass/style.scss"]
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          chunks: "all",
          name: "vendor",
          test: /[\\/]node_modules[\\/]/,
          enforce: true
        }
      }
    }
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "./js/[name].[chunkhash].js"
  },
  module: {
    rules: [
      {
        test: /\.(tsx?)$/,
        exclude: /node_modules/,
        loader: "awesome-typescript-loader",
        options: {
          useBabel: true,
          babelCore: "@babel/core"
        }
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      },
      {
        test: /\.html$/,
        loader: "html-loader"
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "./index.html"
    })
  ]
};