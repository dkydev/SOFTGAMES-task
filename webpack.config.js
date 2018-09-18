const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    "mode": "development",
    "entry": __dirname + "/src/index.js",
    "output": {
        "path": __dirname + '/build',
        "filename": "[name].[chunkhash:8].js"
    },
    plugins: [
        new HtmlWebpackPlugin()
    ]
};