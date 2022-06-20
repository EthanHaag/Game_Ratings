const express = require('express');
const cors = require('cors')
const cookieParser = require('cookie-parser');
require('dotenv').config();
const PORT = process.env.PORT;
const app = express();
app.use(cors({credentials: true, origin: 'http://localhost:3000'}))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
require('./config/mongoose.config');
require('./routes/user.route')(app); 
require('./routes/rating.route')(app) ;
const request = require('request');
const url = 'https://api.steampowered.com/ISteamApps/GetAppList/' +
    'v2/?key=703075AA3D7757A5BFA1F0B10ACF6B4C'

//Games controller and routes are put here because I found it easier to work on

const getDetails=(id) => {
    return new Promise ((resolve, reject)=>{
        request.get( 'http://store.steampowered.com/api/appdetails?appids='+id,(res,body)=>{ 
            if (!body) reject("error no body")
            try{
                resolve(JSON.parse(body.body))
            }
            catch(err){
                console.log("GETDETAILS FAILED (steam API might be exhausted)", err)
                reject("Steam API overuse, try again in 5 minutes")
            }
        })
    })
}

app.get("/api/games/", function(req, res) {
    request.get(url, (steamHttpResponse, steamHttpBody) => {
        const content = JSON.parse(steamHttpBody.body);
        const gameList = (content.applist.apps)
        res.send(gameList)
    })
})
app.get('/api/games/:name', function(httpRequest, httpResponse) {
    request.get(url, (steamHttpResponse, steamHttpBody) => {
        let content = ""
        try{
            content = JSON.parse(steamHttpBody.body);
        }
        catch(err){
            console.log("GAME DETAILS FAILED (steam api could be exhausted)")
            load("Steam API overuse, try again in 5 minutes")
        }
        const gameList = (content.applist.apps)
        const seachedGame = gameList.find(g => g.name == httpRequest.params.name)
        if(seachedGame){
            getDetails(seachedGame.appid)
                .then((body)=>{
                    const details = body[seachedGame.appid].data
                    console.log("fetching ", details.name)
                    load(details)
                })
                .catch(err=>{
                    console.log(err)
                })
        }
        else{
            load("no game found")
        };

 
        function load (game){
            httpResponse.setHeader('Content-Type', 'application/json')
            httpResponse.send(game)
        }
    });

});

const server = app.listen(PORT);
console.log('Listening on port ' + PORT);
//these are failed attempts but there is precious code here that I might still need
/*const seachedGame = gameList.find(g => g.name == "Stardew Valley")
        if(seachedGame){
            getDetails(seachedGame.appid)
                .then((body)=>{
                    const details = body[seachedGame.appid].data
                    console.log(details)
                    genres = ""
                    details.genres.forEach(genre => {
                        genres += genre.description +","
                    })
                    load(
                        details.name+
                        "\n"+"\n"+
                        details.short_description+
                        "\n"+"\n"+
                        details.developers+" \n"+
                        details.publishers+
                        "\n"+"\n"+
                        genres
                    )
                })
                .catch(err=>{
                    console.log(err)
                })
        }
        else{
            load("no game found")
        };*/
        /*function load (game){
            httpResponse.setHeader('Content-Type', 'application/json')
            httpResponse.send(game)
        }*/
        //console.log(gameList)

/*const getDetails=(id) => {
    return new Promise ((resolve, reject)=>{
        request.get( 'http://store.steampowered.com/api/appdetails?appids='+id,(res,body)=>{ 
            if (!body) reject("error no body")
            resolve(JSON.parse(body.body))
        })
    })
}*/
 /*app.get('/api/games/:id', function(request, response) {
   const url = 'http://store.steampowered.com/api/appdetails?appids='+request.params.id;
    request.get(url, (res,body)=>{ 
            const content = JSON.parse(body.body)
            console.log(content)
            response.send(content)
        })
    response.send(getDetails(request.params.id))
})*/