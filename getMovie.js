
exports.getMovie = getMovie;

const axios = require('axios');

function getMovie(url){
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
    
         // checking for undefined cases
         if (typeof title == 'undefined') title = name;
    
         // rounding off ratings to 2 decimals
         ratings = parseFloat(ratings).toFixed(1);
    
         let trendingObject = {
             title: title,
             overview: overview,
             ratings: ratings,
             posterURL: posterURL
         }
    
         array.push(trendingObject);
        }
        //console.log(array);
        }
      )
      .catch(err => {
        console.log('Error: ', err.message);
      }).then(function () {
        return array;
      });
      console.log(v);
      return array;
}