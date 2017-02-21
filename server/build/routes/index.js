'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _location = require('./location');

var _location2 = _interopRequireDefault(_location);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.use('/*', function (req, res, next) {
    res.setHeader('Expires', '-1');
    res.setHeader('Cache-Control', 'must-revalidate, private');
    next();
});

router.use('/location', _location2.default);

exports.default = router;