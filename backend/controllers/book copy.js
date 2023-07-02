const Book = require('../models/Book');
//const Book = require('../data/data.json');
const fs = require('fs');

// afficher les books
exports.getAllBooks = (req, res, next) => {
    Book.find()
        .then(books => res.status(200).json(books))
        .catch(error => res.status(400).json({ error }));

}



// afficher un book
exports.getOneBook = (req, res, next) => {
    Book.findOne({ _id: req.params.id })
        .then(book => res.status(200).json(book))
        .catch(error => res.status(404).json({ error }));

}


//  ajouter book
exports.createBook = (req, res, next) => {
    const bookObject = JSON.parse(req.body.book);
    delete bookObject._id;
    delete bookObject._userId;
    const book = new Book({
        ...bookObject,
        userId: req.auth.userId,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });

    book.save()
        .then(() => { res.status(201).json({ message: 'Objet enregistré !' }) })
        .catch(error => { res.status(400).json({ error }) })

}


// modifier book
exports.modifyBook = (req, res, next) => {
    const bookObject = req.file ? {
        ...JSON.parse(req.body.book),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };

    delete bookObject._userId;
    Book.findOne({ _id: req.params.id })
        .then((book) => {
            if (book.userId != req.auth.userId) {
                res.status(401).json({ message: 'Not authorized' });
            } else {
                Book.updateOne({ _id: req.params.id }, { ...bookObject, _id: req.params.id })
                    .then(() => res.status(200).json({ message: 'Objet modifié!' }))
                    .catch(error => res.status(401).json({ error }));
            }
        })
        .catch((error) => {
            res.status(400).json({ error });
        });
}


// supprimer book
// supprimer book
exports.deleteBook = (req, res, next) => {
    const id = { _id: req.params.id };
    Book.deleteOne(id)
        .then(() => res.status(200).json({ message: 'Objet a ete supprime succes' }))
        .catch(error => res.status(400).json({ error }));

}





// afficher 3 livres de la base de données ayant la meilleure note moyenne.
exports.getBooksBestRating = (req, res, next) => {
    Book.find().sort({ averageRating: -1 }).limit(3)
        .then(books => res.status(200).json(books))
        .catch(error => res.status(400).json({ error }));


}

// attribuer une note
exports.rateBook = (req, res) => {
    //const id = req.params.id;
    const newRanting = {
        userId: req.auth.userId,
        grade: req.body.rating,

    }

    Book.findOne({ _id: req.params.id })

        .then(book => {
            book.ratings.push(newRanting);
            let totalRating = 0;
            for (let i = 0; i < book.ratings.length; i++) {
                let currentRating = book.ratings[i].grade;
                totalRating = totalRating + currentRating
            }
            book.averageRating = totalRating / book.ratings.length;
            console.log(book.averageRating);
            return book.save();

        })
        .then(book => {
            console.log('Book saved:', book);
            res.status(201).json(book);
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({ error: 'Une erreur s\'est produite lors de l\'évaluation du livre.' });
        });
};

