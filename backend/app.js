
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const app = express();
const booksRoutes = require('./routes/book')
const usersRoutes = require('./routes/user')
const path = require('path.join')




// Connexion a la base de donnees
mongoose.connect('mongodb+srv://mdslasso:X3RIRQj2mw05lUTD@cluster0.tl18qzg.mongodb.net/?retryWrites=true&w=majority',
    { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));
module.exports = mongoose;


// Corrriger les erreur cross-origin (cohabitation du servers frontend et backend)
app.use(express.json())
app.use(bodyParser.json())
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});



//------------------------------------------- LIVRES --------------------------------------
app.use('/api/books', booksRoutes)
app.use('/api/auth', usersRoutes)
app.use('/images', express.static(path(__dirname, 'images')))
//------------------------------------------- USERS --------------------------------------


module.exports = app;