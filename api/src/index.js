const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const routes = require('./routes');

const app = express();

mongoose.connect('mongodb+srv://felipe:root@mvp-v1.ducoj.gcp.mongodb.net/v1?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// query Param: request.query (Filtros, ordenação, paginação)
// Route Params: reques.params (Identificar um recurso na alteração ou remoção)
// Body: request.body (Dados para criação ou alteração de um registro)

app.use(express.json());
app.use(morgan('dev'));
app.use(routes);




app.listen(8080, () => {
    console.log('Servidor iniciado')
})

