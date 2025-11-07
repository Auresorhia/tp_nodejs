const mongoose = require('mongoose');

const avisSchema = mongoose.Schema(
    {
        user: { // l’utilisateur qui a laissé l’avis
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        article: { // l’article concerné
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Article',
            required: true
        },
        note: { // note donnée à l’article
            type: Number,
            required: true,
            min: 1,
            max: 5
        },
        commentaire: { // texte de l’avis
            type: String,
            required: true
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model('Avis', avisSchema);
