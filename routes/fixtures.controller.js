const YAML = require('yamljs');
const config = YAML.load('./config.yaml');
var request = require('request');

module.exports.getFixtures = (req, res) => {
    request.get(config.worldCupUrl + '/matches', (err, response, body) => handleMatchesResponse(err, response, body, res))
}

function handleMatchesResponse(err, response, body, res) {
    if (err) {
        handleError(err, res);
        return;
    }
    if (response.statusCode == 404) {
        handleNotFound(res);
        return;
    }

    res.send(body);
}

function handleError(err, res) {
    res.status(500).send(new ErrorResponse(500, 'There was an error handling your request: ' + err).getJson());
}

function handleNotFound(res) {
    res.status(404).send(new ErrorResponse(404, 'The API returned a 404').getJson())
}

class ErrorResponse {
    constructor(code, message) {
        this.code = code;
        this.message = message;
    }

    getJson() {
        return JSON.stringify(this);
    }
}