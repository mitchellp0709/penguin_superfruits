///////////////////////////////////////
//Import dependenceies
///////////////////////////////////////

//import existing connected mongoose object from connection.js
const mongoose = require("./connection")

/////////////////////////////////////
//Create our Fruits Model
////////////////////////////////////

//destructuring Schema and model from mongoose

const { Schema, model } = mongoose 

//make a fruits schema

const fruitSchema = new Schema({
  name: String,
  color: String,
  readyToEat: Boolean
})

//make the Fruit Model (models are ALWAYS uppercase and singular)
const Fruit = model("Fruit", fruitSchema)

////////////////////////////////////////////
//Export fruit model
////////////////////////////////////////////


module.exports = Fruit