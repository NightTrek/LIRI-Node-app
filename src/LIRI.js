require("dotenv").config();
const spotify = require("./keys.js");
const axios = require("axios")
const E = require('enquirer')
const rp = require('request-promise');


// var spotify = new Spotify(keys.spotify);
// console.log(spotify)

var input = process.argv.splice(2);
console.log(input)
var CMCResponse;

var InputHandler = function (CommandArray) {
    switch (CommandArray[`command`].toLowerCase()) {
        case "cmclatest":
            if (CMCResponse === undefined) {
                console.log('getting CMC')
                CMCResponse = coinMarketCapPrice(CommandArray['options']);
            } else {
                console.log('looking at CMC data')
                printCMCData(CMCResponse, CommandArray['options'])
            }
            break;
        case "spotify-this-song":
            getSpotifySong(CommandArray['options']);
            break;
        case `movie-this`:
            getOMDBMovie(CommandArray['options']);
            break;
        case "do-what-it-says":
            doWhatItSays(CommandArray['options'])
            break;

    }
    enquireRepeat();
    // printCMCData(CMCResponse, CommandArray['options'])
}

var enquireInputHandler = async function () {

    let response = await E
        .prompt([
            // Here we create a basic text prompt.
            {
                type: "input",
                message: "What Command do yo wish to invoke",
                name: "command"
            },
            // Here we create a basic password-protected text prompt.
            {
                type: "input",
                message: "Command Options or search term?",
                name: "options"
            }
        ])// end of await
    InputHandler(response);
}

var enquireRepeat = async function () {
    let response = await E
        .prompt([
            // Here we create a basic text prompt.
            {
                type: "confirm",
                message: "Do you wish to Continue?:",
                name: "confirm",
                default: false
            }
        ])// end of await
    console.log(response);
    if (response.confirm == true) {
        enquireInputHandler();
    }
    else {
        console.log('Thank you for using our command line service');
    }


}

//working need to change it so that it can be called by enquire multiple times 
var coinMarketCapPrice = async function (str, convert = "USD") {
    if (typeof str == "string") {
        console.log("cmclatest")
        try {//0883f3bc-2427-4ffa-8f8b-94f8fad9dbae
            const requestOptions = {
                method: 'GET',
                uri: 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest',
                qs: {
                    'start': '1',
                    'limit': '200',
                    'convert': convert
                },
                headers: {
                    'X-CMC_PRO_API_KEY': '0883f3bc-2427-4ffa-8f8b-94f8fad9dbae'
                },
                json: true,
                gzip: true
            };

            const response = await rp(requestOptions)
            for (let i = 0; i < response.data.length; i++) {
                //   console.log(response.data[i].symbol)
                if (response.data[i].symbol == str.trim().toUpperCase()) {
                    //   console.log(response.data[i])
                    console.log(`
                  -----------------------------------------------------------------
                  Symbol: ${response.data[i].symbol}Name: ${response.data[i].name}  
                  
                  USD Price: ${response.data[i].quote.USD.price}
                  24 Hour Volume:  ${response.data[i].quote.USD[`volume_24h`]}
                  Market Cap:   ${response.data[i].quote.USD[`market_cap`]} 
                  
                  -----------------------------------------------------------------`)
                }
            }

            return response.data

        }
        catch (error) {
            console.log('-------------------------------------------------------------')
            console.log(error)
            console.log('-------------------------------------------------------------')


        }
    }
    else {
        console.log('CMC input is not a string')


    }
}

var printCMCData = function (CMCDATA, str) {
    console.log(CMCDATA)
    for (let i = 0; i < CMCDATA.length; i++) {
        // console.log(CMCDATA[i].symbol);
        if (CMCDATA[i].symbol == str.trim().toUpperCase()) {
            console.log(`
                  -----------------------------------------------------------------
                  Symbol: ${CMCDATA[i].symbol}Name: ${CMCDATA[i].name}  
                  
                  USD Price: ${CMCDATA[i].quote.USD.price}
                  24 Hour Volume:  ${CMCDATA[i].quote.USD[`volume_24h`]}
                  Market Cap:   ${CMCDATA[i].quote.USD[`market_cap`]} 
                  
                  -----------------------------------------------------------------`)
            return CMCDATA[i];
        }
    } console.log("Symbol Not found in first 200 coins by market cap")
}

var getSpotifySong = async function (str) {
    console.log("spotify")
    try {
        let response = await axios.get(`"https://api.spotify.com/v1/search?q=${str.trim().split(' ').join("%20")}&type=track&market=US"
         -H "Accept: application/json" -H "Content-Type: application/json" -H "Authorization: Bearer BQArvqQqNL6aI91wrIMy1qUFv070bwN0wREC
         JhrcbeTdp8w4RBpIZ7czYvugQt-EAax79Dbv4dsaaaE0bveKRXh08WHWM-_0aBaHPERmsffh6BhJRBxZmDUF-7FFX8mjNartnxzXA35SeZYZFHOSUmgavnyBjioHzw"`)

        console.log(response)
    }
    catch (error) {
        console.log('-------------------------------------------------------------')
        console.log(error)
        console.log('-------------------------------------------------------------')


    }

}


//working
var getOMDBMovie = async function (str) {
    try {
        let response = await axios.get(`http://www.omdbapi.com/?t=${str.split(' ').join('+')}&apikey=a50c43ab`)//&y=&plot=short
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
    try {
        

    } catch (err) {
        console.log(err)
    }

}

// InputHandler(input);
enquireInputHandler();
// * `concert-this`
// * `spotify-this-song`
// * `do-what-it-says`