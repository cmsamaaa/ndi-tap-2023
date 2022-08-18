const request = require('request');
const generate_person = require('../lib/generate_person');
const HTTP_STATUS = require("../constants/http_status");

exports.viewIndex = async (req, res, next) => {
    res.status(HTTP_STATUS.OK).render('index', {
        path: '/'
    });
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
                fullName: result.fullName,
                sex: result.sex,
                race: result.race,
                entityName: result.entityName,
                title: result.sex === "Male" ? "Mr." : "Ms."
            };
            res.status(HTTP_STATUS.OK).render('profileCard', profile);
        } else
            res.status(HTTP_STATUS.NOT_FOUND).redirect('/verifyProfile?result=false&search=' + req.query.code);
    });
};

exports.verify = async (req, res, next) => {
    if (!req.query.search && !req.query.result) {
        res.status(HTTP_STATUS.OK).render('verify', {
            path: '/verify'
        });
    }
    else {
        res.status(HTTP_STATUS.NOT_FOUND).render('verify', {
            path: '/verify',
            search: req.query.search,
            message: 'This identification code is invalid.'
        });
    }
};

exports.register = async (req, res, next) => {
    res.status(HTTP_STATUS.OK).render('register', {
        path: '/register'
    });
};

exports.myinfo = async (req, res, next) => {
    // api endpoint
    const host = req.protocol + '://' + req.hostname + ':' + process.env.PORT;
    const endpoint = '/api/createProfile/';

    const profile = generate_person.random_individual();

    res.status(HTTP_STATUS.OK).render('myinfo', {
        api_endpoint: host + endpoint,
        profile: profile
    });
};