const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    "mode": "development",
    "entry": __dirname + "/src/index.js",
    "output": {
        "path": __dirname + "/build",
        "filename": "[name].[chunkhash:8].js"
    },
    "plugins": [
        new HtmlWebpackPlugin(),
        new MiniCssExtractPlugin()
    ],
    "module": {
        "rules": [
            {
                "test": /\.(png|jpg|gif)$/,
                "use": [
                    {
                        "loader": "file-loader",
                        "options": {
                            "name": "[name].[ext]",
                            "useRelativePath": true
                        }
                    }
                ]
            },
            {
                "test": /\.css$/,
                "use": [
                    {"loader": MiniCssExtractPlugin.loader},
                    "css-loader"
                ]
            }
        ],
    }
};