const path = require('path');
const glob = require('glob');
const CopyPlugin = require('copy-webpack-plugin');

const tsFiles = glob.sync('./src/handlers/**/*.ts');
const entries = {};

for (const x in tsFiles) {
    entries[tsFiles[x].replace(/(^\.\/src\/)|(\.ts$)/g, '')] = tsFiles[x];
}

module.exports = {
    mode: 'development',
    entry: entries,
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.json', '.tsx']
    },
    optimization: {
        minimize: false
    },
    output: {
        libraryTarget: 'commonjs',
        path: path.join(__dirname, 'build'),
        filename: '[name].js'
    },
    target: 'node',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader'
            }
        ]
    },
    devtool: 'inline-source-map',
    externals: {
        'aws-sdk': 'aws-sdk'
    }
};
