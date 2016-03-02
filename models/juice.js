var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var juiceSchema =  new Schema({
    creator: {
        type: Schema.ObjectId,
        ref: 'User'
    }, //Foreign Key to User
    name: String,
    description: String,
    tags: [Number],
    amount: {
        pgAmount: Number,
        vgAmount: Number,
        juiceAmount: Number
    },
    nicotine: {
        pgAmount: Number,
        vgAmount: Number,
        nicAmount: Number,
        desiredAmount: Number
    },
    flavors: [{
        name: String,
        brand: Number,
        base: Number,
        percent: Number,
        index: Number
    }]
});

module.exports = mongoose.model('Juice', juiceSchema);
/*
var juiceSchema =  new Schema({
    creator: Schema.Types.ObjectId, //Foreign Key to User
    name: String,
    description: String,
    tags: [Number],
    amount: new Schema({
        pgAmount: Number,
        vgAmount: Number,
        juiceAmount: Number
        }, {_id: false}),
    nicotine: new Schema({
        pgAmount: Number,
        vgAmount: Number,
        nicAmount: Number,
        desiredAmount: Number
        }, {_id: false}),
    flavors: new Schema({
        name: String,
        brand: Number,
        base: Number,
        percent: Number,
        index: Number
    })
}); */
