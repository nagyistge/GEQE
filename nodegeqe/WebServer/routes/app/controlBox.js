var express = require('express');
var config = require('config');
var netHelpers = require('netHelpers');
var util = require('util');

var router = express.Router();


router.get('/popScoreList', function (req, res) {

    netHelpers.performAjaxRequest(config.remote.host, config.remote.port, '/popScoreList', 'GET', req.query, function (resultObject) {
        if (resultObject.error) {
            res.status(resultObject.error.status).send(resultObject.error.message);
            return;
        }

        res.status(200).send(resultObject);
    })
});

router.get('/getFileContents', function (req, res) {
    netHelpers.performAjaxRequest(config.remote.host, config.remote.port, '/getFileContents', 'GET', req.query, function (resultObject) {
        if (resultObject.error) {
            res.status(resultObject.error.status).send(resultObject.error.message);
            return;
        }

        res.status(200).send(resultObject);
    })
});

router.get('/getScores', function (req, res) {
    netHelpers.performAjaxRequest(config.remote.host, config.remote.port, '/getScores', 'GET', req.query, function (resultObject) {
        if (resultObject.error) {
            res.status(resultObject.error.status).send(resultObject.error.message);
            return;
        }

        res.status(200).send(resultObject);
    })
});


// TODO: Make more readable, maybe we can replace
//["/popScoreList",
//    "/getFileContents",
//    "/getScores"].forEach(function (name) {
//
//        router.get(name, function (req, res) {
//
//            netHelpers.performAjaxRequest(config.remote.host, config.remote.port, name, 'GET', req.query, function (resultObject) {
//                if (resultObject.error) {
//                    res.status(resultObject.error.status).send(resultObject.error.message);
//                    return;
//                }
//
//                res.status(200).send(resultObject);
//            })
//        });
//
//    });


router.get('/writePoly', function (req, res) {
    netHelpers.performAjaxRequest('localhost', 8080, '/writePoly', 'GET', req.query, function (resultObject) {
        if (resultObject.error) {
            res.status(resultObject.error.status).send(resultObject.error.message);
            return;
        }

        res.status(200).send(resultObject);
    })
});

router.get('/applyScores', function (req, res) {
    netHelpers.performAjaxRequest('localhost', 8080, '/applyScores', 'GET', req.query, function (resultObject) {
        if (resultObject.error) {
            res.status(resultObject.error.status).send(resultObject.error.message);
            return;
        }

        res.status(200).send(resultObject);
    })
});

router.get('/launchTest', function (req, res) {
    netHelpers.performAjaxRequest('localhost', 8080, '/launchTest', 'GET', req.query, function (resultObject) {
        if (resultObject.error) {
            res.status(resultObject.error.status).send(resultObject.error.message);
            return;
        }

        res.status(200).send(resultObject);
    })
});

router.get('/getTest', function (req, res) {
    netHelpers.performAjaxRequest('localhost', 8080, '/getTest', 'GET', req.query, function (resultObject) {
        if (resultObject.error) {
            res.status(500).send(resultObject.error);
            return;
        }

        res.status(200).send(resultObject);
    })
});


module.exports = router;