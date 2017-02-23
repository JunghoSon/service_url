'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _routes = require('./routes');

var _routes2 = _interopRequireDefault(_routes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

var port = 8080;

app.use((0, _morgan2.default)('dev'));
app.use((0, _bodyParser2.default)());

var db = _mongoose2.default.connection;
db.on('error', console.error);
db.once('open', function () {
    console.log('Connected to mongodb server');
});
_mongoose2.default.connect('mongodb://jhson:wjdgh0754522@ds157549.mlab.com:57549/serv_urls');
//mongoose.connect('mongodb://localhost/serv_urls');

app.use('/', _express2.default.static(__dirname + '/../../public'));
app.use('/api', _routes2.default);

app.listen(port, function () {
    console.log('Server is runnig on port ', port);
});