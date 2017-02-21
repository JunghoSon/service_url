var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('../../webpack.dev.config');

var compiler = webpack(config);
var devServer = new WebpackDevServer(compiler, config.devServer);
var port = 8081;

devServer.listen(port, () => {
    console.log('webpack-dev-server is listening on port ', port);
});