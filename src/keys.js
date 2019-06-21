var Spotify = require('node-spotify-api');
require("dotenv").config();


//js

console.log(process.env.SPOTIFY_ID) 

console.log(process.env.SPOTIFY_SECRET)

console.log('this is loaded');


var spotify = new Spotify({
  id: process.env.SPOTIFY_ID,
  secret: process.env.SPOTIFY_SECRET
});




module.exports = spotify