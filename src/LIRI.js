require("dotenv").config();
var keys = require("./keys.js");
var axios = require("axios")
var E = require('enquirer')


// var spotify = new Spotify(keys.spotify);
// console.log(spotify)

var input = process.argv.splice(2);
console.log(input)

var InputHandler = function (CommandArray) {
    if (CommandArray.length < 2) {
        console.error('Required two inputes the first being the command and the second being options')
        return;
    }
    if (CommandArray.length > 2) {
        let passover = CommandArray.splice(1)
        CommandArray[1] = passover.join("+");
        console.log(CommandArray[1])
    }

    switch (CommandArray[0].toLowerCase()) {
        case "concert-this":
            getConcertData(CommandArray[1]);
            break;
        case "spotify-this-song":
            getSpotifySong(CommandArray[1]);
            break;
        case `movie-this`:
            getOMDBMovie(CommandArray[1]);
            break;
        case "do-what-it-says":
            doWhatItSays(CommandArray[1])
            break;

    }
}


var getConcertData = function () {
    console.log("concert")

}

var getSpotifySong = function () {
    console.log("spotify")

}



var getOMDBMovie = async function (str) {
    try {
        let response = await axios.get(`http://www.omdbapi.com/?t=${str}&apikey=a50c43ab`)//&y=&plot=short
        console.log(response.data.Response)
        if (response.data.Response == 'False') {
            console.log("movie not found")
        }
        else {
            console.log(`Title: ${response.data.Title}`);
            console.log(`Came Out: ${response.data.Released}`);
            console.log(`Rated: ${response.data.Rated}`);
            if (response.data.Ratings[1] !== undefined) {
                console.log(`rotten Tomatees: ${response.data.Ratings[1].Value}`);
            } else { console.log('rotten Tomatoes: N/A') }
            console.log(`Country: ${response.data.Country}`);
            console.log(`Language: ${response.data.Language}`);
            console.log(`Plot: ${response.data.Plot}`);
            console.log(`Actors: ${response.data.Actors}`);
        }
    }
    catch (error) {
        console.log('-------------------------------------------------------------')
        console.log(error)
        console.log('-------------------------------------------------------------')


    }


}




var doWhatItSays = function () {
    console.log("im the dom")

}

InputHandler(input);
// * `concert-this`
// * `spotify-this-song`
// * `movie-this`
// * `do-what-it-says`