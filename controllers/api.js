const HTTP_STATUS = require("../constants/http_status")
const profiles = require('../models/profiles')

exports.createProfile = async (req, res, next) => {
    const results = await profiles.createProfile(req.body);
    res.status(HTTP_STATUS.CREATED).json({ id: results[0] });
}

exports.getProfile = async (req, res, next) => {
    const results = await profiles.getProfile(req.params.code);
    res.status(HTTP_STATUS.OK).json(results[0]);
}