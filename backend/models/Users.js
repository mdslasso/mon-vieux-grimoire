const mongoose = require("mongoose")


// le model de base de donnne pour le signup (enregistrer un nouvel utilisateur)

const usersSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },

});

module.exports = mongoose.model("Users", usersSchema);