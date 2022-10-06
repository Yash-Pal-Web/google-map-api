const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const citySchema=new mongoose.Schema({
    location: {type: { type: String}, coordinates: []},
    title: {type: String, required: true}
    
});

//city.places.createIndex( { location: "2dsphere" } )

citySchema.index({ location: "2dsphere" });

module.exports = mongoose.model("city", citySchema);


