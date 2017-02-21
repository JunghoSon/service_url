'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _Location = require('../models/Location');

var _Location2 = _interopRequireDefault(_Location);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.post('/', function (req, res) {
    if (typeof req.body.url !== 'string' || req.body.url === '') {
        res.status(400).json({
            success: false,
            message: '잘못된 URL 입니다'
        });
    }

    var Location = new Location({
        loc: req.body.url
    });

    Location.save(function (err) {
        if (err) throw err;

        return res.json({
            success: true
        });
    });
});

router.get('/', function (req, res) {
    _Location2.default.find({}).sort({ _id: -1 }).limit(20).exec(function (err, Locations) {
        if (err) throw err;
        res.json(Locations);
    });
});

exports.default = router;