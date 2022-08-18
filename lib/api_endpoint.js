exports.parse = (req, endpoint) => {
    const host = req.protocol + '://' + req.hostname + ':' + process.env.PORT;
    return host + endpoint;
}