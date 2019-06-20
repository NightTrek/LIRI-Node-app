require("dotenv").config();
var keys = require("./keys.js");
var axios = require("axios")
var E = require('enquirer')
const rp = require('request-promise');


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
        case "cmclatest":
            coinMarketCapPrice(CommandArray[1]);
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


var coinMarketCapPrice = async function (str) {
    console.log("cmclatest")
    try {//0883f3bc-2427-4ffa-8f8b-94f8fad9dbae
        const requestOptions = {
            method: 'GET',
            uri: 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest',
            qs: {
              'start': '1',
              'limit': '100',
              'convert': 'USD'
            },
            headers: {
              'X-CMC_PRO_API_KEY': '0883f3bc-2427-4ffa-8f8b-94f8fad9dbae'
            },
            json: true,
            gzip: true
          };
          
          const response = await rp(requestOptions)
          console.log(response.data);
          for(key in response.data){
              console.log(key)
          }


        
    }
    catch (error) {
        console.log('-------------------------------------------------------------')
        console.log(error)
        console.log('-------------------------------------------------------------')


    }
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
// * `do-what-it-says`