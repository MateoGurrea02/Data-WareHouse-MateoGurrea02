const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./docs/swagger.yaml');
const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const config = require('./config/index');
const connection = require('./connection');
const CityContoller = require('./controllers/Cities');
const CompanyController = require('./controllers/Companies');
const UserController = require('./controllers/Users');
const ContactController = require('./controllers/Contacts');
const CountryController = require('./controllers/Countrys');
const RegionController = require('./controllers/Regions');

//Docs
if (config.env === 'development') {
    const swaggerUi = require('swagger-ui-express');
    const YAML = require('yamljs');
    app.use(require('morgan')('dev'))
    const swaggerDocument = YAML.load('./docs/swagger.yaml');
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
}

//Endpoints for Users
app.get('/api/user', UserController.getAll);
//Endpoints for Regions
app.get('/api/region', RegionController.getAll);
//Endpoints for Countries
app.get('/api/country', CountryController.getAll);
//Endpoints for Cities
app.get('/api/city', CityContoller.getAll);
//Endpoints for Contacts
app.get('/api/contact', ContactController.getAll);
//Endpoints for Companies
app.get('/api/company', CompanyController.getAll);

const port = config.port;
app.listen(port, () => {
    console.log(`Server started on port=${port}`);
});