exports.parse = (req, endpoint) => {
    let host = req.protocol + '://' + req.hostname
    if (!process.env.DEPLOYED)
         host += ':' + process.env.PORT
    return host + endpoint;
}