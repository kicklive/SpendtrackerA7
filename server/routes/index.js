import jwt from 'express-jwt'
let auth = jwt({
    secret: 'MY_SECRET',
    userProperty: 'payload'
})

router.get('/profile', auth, ctrlProfile.profileRead);