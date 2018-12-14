import express from 'express';
import logger from 'morgan';
import bodyParser from 'bodyParser';
import session from 'express-session';

import path from 'path';
import favicon from 'eserve-favicon';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import bodyParser from 'body-parser';
import passport from 'passport';
import errorHandler from '_helpers/error-handler';

require('./api/models/db');
require('./api/config/passport');

let app=express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());


app.use(passport.initialize());
app.use('/api', routesApi);
// use JWT auth to secure the api

// // api routes
// app.use('/users', require('./users/users.controller'));

// // global error handler
// app.use(errorHandler);

// // start server
// const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 4000;
// const server = app.listen(port, function () {
//     console.log('Server listening on port ' + port);
});
