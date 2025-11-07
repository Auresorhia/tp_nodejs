const mongoose = require('mongoose');


const articleSchema = mongoose.Schema(
    {
        name: {//Prénom de l’utilisateur
            type: String,
            required: true
        },
        content:{//Image/avatar de l’utilisateur
            type: String,
            required: true
        },
        category:{//Email de l’utilisateur
            type: String,
            required: true
        },
        brand:{
            type: Boolean,
            required: true
        },
        price:{
            type: Number,
            required: true
        },
        user:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        avis:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Avis"
        },
        picture:{
            type:String,
            required: true
        },
        img1:{
            type:String,
            required: true
        },
        img2:{
            type:String,
            required: true
        },
        img3:{
            type:String,
            required: true
        },
        img4:{
            type:String,
            required: true
        },
        status:{
            type:Boolean,
            required: true
        },
        stock:{
            type:Number,
            required: true
        }
    },{ timestamps: { createAt: true } }
)

module.exports = mongoose.model('Article', articleSchema)