const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./docs/swagger.yaml');
const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/public', express.static('public'));

const config = require('./config/index');
const connection = require('./connection');
const CityContoller = require('./controllers/Cities');
const CompanyController = require('./controllers/Companies');
const UserController = require('./controllers/Users');
const ContactController = require('./controllers/Contacts');
const CountryController = require('./controllers/Countrys');
const RegionController = require('./controllers/Regions');
const ContactChannelController = require('./controllers/Contact_channel'); 

//Middlewares
const existUser = require('./middlewares/existUser');
const existCity = require('./middlewares/existCity');
const existCountry = require('./middlewares/existCountry');
const existRegion = require('./middlewares/existRegion');
const existCompany = require('./middlewares/existCompany');
const existContact = require('./middlewares/existContact');
const isAdmin = require('./middlewares/isAdmin');
const isBasico = require('./middlewares/isBasico');


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
// app.post('/api/user/login/:token', UserController.checkToken);

//Endpoints for Users
app.get('/api/user', isAdmin, UserController.getAll);
app.post('/api/user', isAdmin, UserController.create);
app.get('/api/user/:id', existUser, isAdmin, UserController.getById);
app.patch('/api/user/:id', existUser, isAdmin, UserController.update);
app.delete('/api/user/:id', existUser, isAdmin, UserController.delete);

//Endpoints for Regions
app.get('/api/region', isBasico, RegionController.getAll);
app.post('/api/region', isBasico, RegionController.create);
app.patch('/api/region/:id', isBasico, existRegion, RegionController.update);
app.delete('/api/region/:id', isBasico, existRegion, RegionController.delete);

//Endpoints for Countries
app.get('/api/country', isBasico, CountryController.getAll);
app.post('/api/country', isBasico, CountryController.create);
app.patch('/api/country/:id', isBasico, existCountry, CountryController.update);
app.delete('/api/country/:id', isBasico, existCountry, CountryController.delete);

//Endpoints for Cities
app.get('/api/city', isBasico, CityContoller.getAll);
app.post('/api/city', isBasico, CityContoller.create);
app.patch('/api/city/:id', isBasico, existCity,CityContoller.update);
app.delete('/api/city/:id', isBasico, existCity,CityContoller.delete);

//Endpoints for Contacts
app.get('/api/contact', isBasico, ContactController.getAll);
app.post('/api/contact', isBasico, ContactController.create);
app.patch('/api/contact/:id', isBasico, existContact,ContactController.update);
app.delete('/api/contact/:id', isBasico, existContact,ContactController.delete);

//Endpoints for Contacts_channel
app.post('/api/contact_channel', isBasico, ContactChannelController.add);

//Endpoints for Companies
app.get('/api/company', isBasico, CompanyController.getAll);
app.post('/api/company', isBasico, CompanyController.create);
app.patch('/api/company/:id', isBasico, existCompany, CompanyController.update);
app.delete('/api/company/:id', isBasico, existCompany, CompanyController.delete);

const port = config.port;
app.listen(port, () => {
    console.log(`Server started on port=${port}`);
});