# LIRI-Node-app
basic text based assistant

Required NPM modules - 

 1. enquirer
 2. axios
 3.request-promise
 4.node-spotify-api
 5. request
 6. dotenv
 7. Additionally you need an API key and a .env file with you spotify keys.


Working Principle.

The LIRI BOT is a Request baded tool which uses enquirer to ask for user input and Respond with API Data. You can also use a
CommandList.JSON to list and run comands you want to use. The LIRI bot also Uses Enquirer to loop the program allowing for the 
user to continue using the Data recived from the API's without making extra calls. The primary event handler is a switch statment
which uses one of Four input strings. After inputing the comand you want to use you can than put in an argument as outlined below.

  1.Command: "cmclatest"
  
  
      Takes One Argument: SYMBOL for the cryptoCurreny you want data on. example "BTC" "ETH" "XRP"
       Returns: Current Price Volume and market Cap of the crypto.
       
       
  2.Command: "spotify-this-song"
  
  
      Takes one argument: Track name: Example "Seven Nation Army" "Bad Romance"
      Returns: Song info like name and a link to the preview which you can open on your spotify player.
      
      
  3.Command: "movie-this"
  
  
      Takes One argument. Movie title: example "the matrix" "ex machina"
      Returns: Info about the movie including rating plot and title.
      
      
  4.Command: "do-what-it-says"
  
  
    Takes one Argument File name" Default is "CommandList.json" but you can specify any json formated file.
    make sure each command array contains a "command" key and an "options" key. also make sure each comand and key pair is in     array of objects
    Returns: Runs each command string listed in the file and returns the result. any number of commands
    
    
    Additional Notes The API key for CoinMarket Cap has been limited to 333 Requests per day and 10,000 per month. If you run the 
    CMCLatest Command repeatedly without Stoping the program it will use the same data it pulled in the first API call over and over
    again. 
