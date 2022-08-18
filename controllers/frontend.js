const request = require('request');
const generate_person = require('../lib/generate_person');
const api_endpoint = require('../lib/api_endpoint');
const HTTP_STATUS = require("../constants/http_status");

exports.viewIndex = async (req, res, next) => {
    res.status(HTTP_STATUS.OK).render('index', {
        path: '/'
    });
};

exports.viewProfile = async (req, res, next) => {
    // if query code is empty
    if (!req.query.code) {
        res.status(HTTP_STATUS.NOT_FOUND).redirect('/verify?result=false');
        return;
    }

    // api endpoint uri
    const uri = api_endpoint.parse(req, '/api/getProfile/');
    request(uri + req.query.code, (error, response, body) => {
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
            res.status(HTTP_STATUS.NOT_FOUND).redirect('/verify?result=false&search=' + req.query.code);
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
    // api endpoint uri
    const uri = api_endpoint.parse(req, '/api/createProfile/');

    // generate fake person info
    const profile = generate_person.random_individual();

    res.status(HTTP_STATUS.OK).render('myinfo', {
        api_uri: uri,
        profile: profile
    });
};

exports.myinfoBusiness = async (req, res, next) => {
    // api endpoint uri
    const uri = api_endpoint.parse(req, '/api/createProfile/');

    // generate fake person + entity info
    const profile = generate_person.random_entity_individual();

    res.status(HTTP_STATUS.OK).render('myinfoBusiness', {
        api_uri: uri,
        profile: profile
    });
};