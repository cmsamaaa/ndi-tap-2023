const request = require('request');
const parse_uri = require("../lib/parse_uri");
const HTTP_STATUS = require("../constants/http_status");

exports.register = async (req, res, next) => {
    // api endpoint uri
    const uri = parse_uri.parse(req, '/api/createProfile/');
    console.log(req.body);
    request.post({
        url: uri,
        form: req.body
    }, (err, response, body) => {
        if (response.statusCode === 201)
            res.redirect(parse_uri.parse(req, '/viewProfile?code=' + req.body.code));
        else
            res.redirect(parse_uri.parse(req, '/register?result=false'));
    });
}