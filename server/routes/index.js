import jwt from 'express-jwt'
let auth = jwt({
    secret: 'MY_SECRET',
    userProperty: 'payload'
})