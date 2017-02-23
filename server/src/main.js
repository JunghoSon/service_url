import express from 'express';
import bodyParser from 'body-parser';

import morgan from 'morgan';
import mongoose from 'mongoose';

import api from './routes'

const app = express();

let port = 8080;

app.use(morgan('dev'));
app.use(bodyParser());

const db = mongoose.connection;
db.on('error', console.error);
db.once('open', () => {
    console.log('Connected to mongodb server');
});
//mongoose.connect('mongodb://jhson:wjdgh0754522@ds157549.mlab.com:57549/serv_urls');
mongoose.connect('mongodb://localhost/serv_urls');

app.use('/', express.static(__dirname + '/../../public'));
app.use('/api', api)

app.listen(port, () => {
    console.log('Server is runnig on port ', port);
});