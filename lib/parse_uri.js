exports.parse = (req, endpoint) => {
    let host = req.protocol + '://' + req.hostname
    if (process.env.URI_IGNORE_PORT != 1)
         host += ':' + process.env.PORT
    return host + endpoint;
}