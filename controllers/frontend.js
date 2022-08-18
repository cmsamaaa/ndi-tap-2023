const request = require('request');
const HTTP_STATUS = require("../constants/http_status");

exports.viewIndex = async (req, res, next) => {
    res.status(HTTP_STATUS.OK).render('index');
};

exports.viewProfile = async (req, res, next) => {
    // if query code is empty
    if (!req.query.code) {
        res.status(HTTP_STATUS.NOT_FOUND).redirect('/verifyProfile?result=false');
        return;
    }

    const host = req.protocol + '://' + req.hostname + ':' + process.env.PORT;
    const endpoint = '/api/getProfile/';
    request(host + endpoint + req.query.code, (error, response, body) => {
        if (body) {
            const result = JSON.parse(body);
            const profile = {
                code: result.code,
                firstName: result.firstName,
                lastName: result.lastName,
                sex: result.sex,
                race: result.race,
                organisation: result.organisation,
                title: result.sex === "Male" ? "Mr." : "Ms."
            }
            res.status(HTTP_STATUS.OK).render('profileCard', profile);
        } else
            res.status(HTTP_STATUS.NOT_FOUND).redirect('/verifyProfile?result=false&search=' + req.query.code);
    });
};

exports.verifyProfile = async (req, res, next) => {
    if (!req.query.search && !req.query.result) {
        res.status(HTTP_STATUS.OK).render('verifyProfile');
    }
    else {
        res.status(HTTP_STATUS.NOT_FOUND).render('verifyProfile', {
            search: req.query.search,
            message: 'This identification code is invalid.'
        });
    }
};