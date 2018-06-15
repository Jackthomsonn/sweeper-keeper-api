const express = require("express");
const bodyParser = require("body-parser");
const controllers = {
    fixtures: require('./routes/fixtures.controller.js')
}
const YAML = require('yamljs');
const config = YAML.load('./config.yaml');

const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Contorl-Allow-Credentials', true);
    next();
});
app.use(bodyParser.json());

//app.get('/', (req, res) => res.send('Alright mate?'));
app.get('/groups/:groupName', controllers.fixtures.getFixtures);

app.listen(config.port, () => console.log('Sweeper keeper running on port ' + config.port));