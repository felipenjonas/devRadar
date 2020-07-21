const { Router } = require('express');
const routes = Router(); 


const DevController = require('./controllers/DevController');
const SearchController = require('./controllers/SearchController');


routes.get('/', (req, res) => {
    return  res.json({"message":"Servidor rodando"})
})

/*  EndPoints web = DEVS */
routes.get('/devs', DevController.index);
routes.post('/devs', DevController.store);

/*Endpoint using Mobile app */
routes.get('/search', SearchController.index);



module.exports = routes;