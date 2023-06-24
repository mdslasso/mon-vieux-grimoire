const express = require("express");
const router = express.Router();
const bookController = require('../controllers/book');
const auth = require('../middelware/auth')
const multer = require('../middelware/multer-config');




// Afficher 3 livres de la base de données ayant la meilleure note moyenne.
router.get('/bestrating', bookController.getBooksBestRating);
// donner note user
//router.get('/:id/rating', auth, bookController.getUserRating);
router.get('/:id/rating', auth, bookController.rateBook);

// Afficher des donnees de la base de donnee
router.get('/', bookController.getAllBooks);
// Afficher un objet
router.get('/:id', bookController.getOneBook);
// Ajouter un objet
router.post('/', auth, multer, bookController.createBook);
// Modifier  un objet
router.put('/:id', auth, multer, bookController.modifyBook);
// Supprimer  un  objet
router.delete('/:id', auth, bookController.deleteBook);



module.exports = router;