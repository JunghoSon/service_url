'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _Locate = require('../models/Locate');

var _Locate2 = _interopRequireDefault(_Locate);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.post('/', function (req, res) {
    if (typeof req.body.url !== 'string' || req.body.url === '') {
        res.status(400).json({
            success: false,
            message: '잘못된 URL 입니다'
        });
    }

    var locate = new _Locate2.default({
        loc: req.body.url,
        title: req.body.title,
        email: req.body.email
    });

    locate.save(function (err) {
        if (err) throw err;

        return res.json({
            success: true
        });
    });
});

router.get('/', function (req, res) {
    _Locate2.default.find({}).sort({ _id: -1 }).limit(20).exec(function (err, Locates) {
        if (err) throw err;
        res.json(Locates);
    });
});

router.get('/:id', function (req, res) {
    var objectId = new _mongoose2.default.Types.ObjectId(req.params.id);

    _Locate2.default.find({ _id: { $lt: objectId } }).sort({ _id: -1 }).limit(20).exec(function (err, Locates) {
        if (err) throw err;
        res.json(Locates);
    });
});

exports.default = router;