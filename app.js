

const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const https = require('https');
const axios = require('axios');
const movie = require(__dirname+"/getMovie.js");


const API_KEY = '350dfd4ff79fab6f95562ce70ac31dc9';

const app = express();
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));

//Setting up the home route
app.get('/', (req, res)=>{
    res.render('index');
})

// Get extra pages
app.get('/top-movies', (req, response)=>{
    
    const url = 'https://api.themoviedb.org/3/trending/movie/day?api_key='+API_KEY;
    let array = []; 
    axios.get(url).then(res => {
        const movies = res.data;
         // here resetting the array so no duplicate items

         for(let i=0; i<20; i++){
         let id = movies.results[i].id;
         let title = movies.results[i].title;
         let name = movies.results[i].name;
         let overview = movies.results[i].overview;
         let ratings = movies.results[i].vote_average;
         let posterURL = 'https://image.tmdb.org/t/p/w500'+ movies.results[i].poster_path;
         let mediaType = movies.results[i].media_type;
    
         // checking for undefined cases
         if (typeof title == 'undefined') title = name;
    
         // rounding off ratings to 2 decimals
         ratings = parseFloat(ratings).toFixed(1);
    
         let trendingObject = {
             id: id,
             title: title,
             overview: overview,
             ratings: ratings,
             posterURL: posterURL,
             mediaType: mediaType
         }
    
         array.push(trendingObject);
        }
        }
      )
      .catch(err => {
        console.log('Error: ', err.message);
      }).then(function () {
        response.render('top-movies',{trending: array} );
      });
    // end
})

app.get('/top-tv-show', (req, response)=>{
    const url = 'https://api.themoviedb.org/3/trending/tv/week?api_key='+API_KEY;
    let array = []; 
    axios.get(url).then(res => {
        const movies = res.data;
         // here resetting the array so no duplicate items
         for(let i=0; i<20; i++){
         let id = movies.results[i].id;
         let title = movies.results[i].title;
         let name = movies.results[i].name;
         let overview = movies.results[i].overview;
         let ratings = movies.results[i].vote_average;
         let posterURL = 'https://image.tmdb.org/t/p/w500'+ movies.results[i].poster_path;
         let mediaType = movies.results[i].media_type;
    
         // checking for undefined cases
         if (typeof title == 'undefined') title = name;
    
         // rounding off ratings to 2 decimals
         ratings = parseFloat(ratings).toFixed(1);
    
         let trendingObject = {
             id: id,
             title: title,
             overview: overview,
             ratings: ratings,
             posterURL: posterURL,
             mediaType: mediaType
         }
    
         array.push(trendingObject);
        }
        }
      )
      .catch(err => {
        console.log('Error: ', err.message);
      }).then(function () {
        response.render('top-tv-show',{trending: array} );
      });
    // end
})

app.get('/about', (req, res)=>{
    res.render('about');
})


// Searching Movies

app.post('/search', (req, response)=>{
    var query = req.body.search;
    const url = 'https://api.themoviedb.org/3/search/multi?api_key='+API_KEY+'&language=en-US&page=1&query='+query;
    let array = [];   
    axios.get(url).then(res => {
        const movies = res.data;
         // here resetting the array so no duplicate items
         for(let i=0; i<20; i++){
         let id = movies.results[i].id;
         let title = movies.results[i].title;
         let name = movies.results[i].name;
         let overview = movies.results[i].overview;
         let ratings = movies.results[i].vote_average;
         let posterURL = 'https://image.tmdb.org/t/p/w500'+ movies.results[i].poster_path;
         let mediaType = movies.results[i].media_type;
    
         // checking for undefined cases
         if (typeof title == 'undefined') title = name;
    
         // rounding off ratings to 2 decimals
         ratings = parseFloat(ratings).toFixed(1);
    
         let trendingObject = {
             id: id,
             title: title,
             overview: overview,
             ratings: ratings,
             posterURL: posterURL,
             mediaType: mediaType
         }
    
         array.push(trendingObject);
        }
        }
      )
      .catch(err => {
        console.log('Error: ', err.message);
      }).then(function () {
        response.render('search',{trending: array} );
      });

})


// Individual Movie Page

app.get('/movie/:id', (request, response)=>{
    let id = request.params.id;
    const url = 'https://api.themoviedb.org/3/movie/'+id+'?api_key='+API_KEY+'&language=en-US';

    console.log(url);

    axios.get(url).then(res => {
        const movie = res.data;

         let id = movie.id;
         let title = movie.title;
         let name = movie.name;
         let overview = movie.overview;
         let ratings = movie.vote_average;
         let posterURL = 'https://image.tmdb.org/t/p/w500'+ movie.poster_path;
         let originalLanguage = movie.original_language;

         let runtime = movie.runtime;
         let release_date = movie.release_date;
         let revenue = movie.revenue;
         let status = movie.status;

         let country = movie.production_countries[0].name;

         // getting genre
         let genre = [];
         let temp = "";
         for(let i=0;i<5;i++){
            try{
            temp = movie.genres[i].name;
            } catch(e){
                break;
            }
            genre.push(temp);
         }
         
         // getting production compinies
         let compinies = [];
         for(let i=0;i<5;i++){
            try{
            temp = movie.production_companies[i].name;
            } catch(e){
                break;
            }
            compinies.push(temp);
         }
         
         //languages spoken
         let languages = [];
         for(let i=0;i<5;i++){
            try{
            temp = movie.spoken_languages[i].english_name;
            } catch(e){
                break;
            }
            languages.push(temp);
         }
         console.log(languages);

         // checking for undefined cases
         if (typeof title == 'undefined') title = name;
    
         // rounding off ratings to 2 decimals
         ratings = parseFloat(ratings).toFixed(1);

    })
    .catch(err => {
      console.log('Error: ', err.message);
    }).then(function () {
      //response.render('search',{trending: array} );
    });
    response.render('movie');
})


app.get('/tv/:id', (request, response)=>{
    let id = request.params.id;
    const url = 'https://api.themoviedb.org/3/tv/'+id+'?api_key='+API_KEY+'&language=en-US';

    console.log(url);
})


//Setting Server Listening Port
app.listen(3000, ()=>{
    console.log("Server Started at PORT: 3000");
})


// The Movie DB API key -> 350dfd4ff79fab6f95562ce70ac31dc9