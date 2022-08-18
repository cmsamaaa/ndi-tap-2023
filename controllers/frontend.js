const request = require('request');
const HTTP_STATUS = require("../constants/http_status");

exports.viewProfile = async (req, res, next) => {
    const host = req.protocol + '://' + req.hostname + ':' + process.env.PORT;
    const endpoint = '/api/getProfile/';
    request(host + endpoint + req.query.code, (error, response, body) => {
        if (body) {
            const result = JSON.parse(body);
            const profile = {
                code: result.code,
                firstName: result.firstName,
                lastName: result.lastName,
                gender: result.gender,
                organisation: result.organisation,
                title: result.gender === "Male" ? "Mr." : "Ms."
            }
            res.status(HTTP_STATUS.OK).render('profile', profile);
        }
        else
            res.status(HTTP_STATUS.NOT_FOUND).render('error', {
                statusCode: HTTP_STATUS.NOT_FOUND,
                message: 'User not found'
            });
    });
};

exports.verifyProfile = async (req, res, next) => {
    res.status(HTTP_STATUS.OK).render('verifyProfile');
};