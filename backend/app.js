
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const Books = require('./models/Books');
const Users = require('./models/Users')
const app = express();


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

// Afficher livre
app.get('/api/books', (req, res, next) => {
    Books.find()
        .then(books => res.status(200).json(books))
        .catch(error => res.status(400).json({ error }));

});


// Afficher un livre
app.get('/api/books/:id', (req, res, next) => {
    Books.findOne({ _id: req.params.id })
        .then(book => res.status(200).json(book))
        .catch(error => res.status(404).json({ error }));

});

// Ajouter un livre
app.post('/api/books', (req, res, next) => {
    delete req.body._id;
    const book = new Book({
        ...req.body
    });
    book.save()
        .then(() => res.status(201).json({ message: 'Objet enregistrer avec succes' }))
        .catch(error => res.status(400).json({ error }));
});


// Modifier  un livre
app.put('/api/books/:id', (req, res, next) => {
    Books.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Objet a ete modifie avec succes' }))
        .catch(error => res.status(400).json({ error }));

});


// Supprimer  un  livre
app.delete('/api/books/:id ', (req, res, next) => {
    Books.deleteOne({ _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Objet a ete supprime succes' }))
        .catch(error => res.status(400).json({ error }));

});


//------------------------------------------- USERS --------------------------------------







module.exports = app;