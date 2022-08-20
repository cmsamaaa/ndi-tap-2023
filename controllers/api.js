const HTTP_STATUS = require("../constants/http_status");
const profiles = require('../models/profiles');
const _ = require('lodash');

exports.createProfile = async (req, res, next) => {
    if (!_.isEmpty(req.body)) {
        const results = await profiles.createProfile(req.body);

        if (!_.isEmpty(results))
            res.status(HTTP_STATUS.CREATED).json({id: results[0]});
        else
            res.status(HTTP_STATUS.BAD_REQUEST).json({});
    } else
        res.status(HTTP_STATUS.BAD_REQUEST).json({});
};

exports.getProfile = async (req, res, next) => {
    const results = await profiles.getProfile(req.params.code);
    if (!_.isEmpty(results))
        res.status(HTTP_STATUS.OK).json(results[0]);
    else
        res.status(HTTP_STATUS.NOT_FOUND).json({});
};

exports.invalidEndpoint = (req, res, next) => {
    res.status(HTTP_STATUS.NOT_FOUND).json({
        message: 'API endpoint not found'
    });
};