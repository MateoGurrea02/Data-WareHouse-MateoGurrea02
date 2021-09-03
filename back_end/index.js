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

//Middlewares
const existUser = require('./middlewares/existUser');
const existCity = require('./middlewares/existCity');
const existCountry = require('./middlewares/existCountry');
const existRegion = require('./middlewares/existRegion');
const existCompany = require('./middlewares/existCompany');


//Docs
if (config.env === 'development') {
    const swaggerUi = require('swagger-ui-express');
    const YAML = require('yamljs');
    app.use(require('morgan')('dev'))
    const swaggerDocument = YAML.load('./docs/swagger.yaml');
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
}
//Endpoint Login
app.post('/api/user/login', UserController.login);

//Endpoints for Users
app.get('/api/user', UserController.getAll);
app.post('/api/user', UserController.create);
app.get('/api/user/:id', existUser,UserController.getById);
app.patch('/api/user/:id', existUser, UserController.update);
app.delete('/api/user/:id', existUser,UserController.delete);

//Endpoints for Regions
app.get('/api/region', RegionController.getAll);
app.post('/api/region', RegionController.create);
app.patch('/api/region/:id', existRegion, RegionController.update);
app.delete('/api/region/:id', existRegion, RegionController.delete);

//Endpoints for Countries
app.get('/api/country', CountryController.getAll);
app.post('/api/country', CountryController.create);
app.patch('/api/country/:id', existCountry, CountryController.update);
app.delete('/api/country/:id', existCountry, CountryController.delete);

//Endpoints for Cities
app.get('/api/city', CityContoller.getAll);
app.post('/api/city', CityContoller.create);
app.patch('/api/city/:id', existCity,CityContoller.update);
app.delete('/api/city/:id', existCity,CityContoller.delete);

//Endpoints for Contacts
app.get('/api/contact', ContactController.getAll);
app.post('/api/contact', ContactController.create);

//Endpoints for Companies
app.get('/api/company', CompanyController.getAll);
app.post('/api/company', CompanyController.create);
app.patch('/api/company/:id', existCompany, CompanyController.update);
app.delete('/api/company/:id', existCompany, CompanyController.delete);

const port = config.port;
app.listen(port, () => {
    console.log(`Server started on port=${port}`);
});