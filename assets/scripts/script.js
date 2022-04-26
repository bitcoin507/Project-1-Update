
var requesUrl = "https://api.themoviedb.org/" //"http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&r=json";
var movieName = "Dracula";
var currentPage=0;
var pageNumber=0;
var totalPages=0;
var movieDataJson;
var movies = [];
var multipage=false;
var movieTitle="";
var movieOverview="";





function getMovieByName(movieName, pageNumber) {
    
    // if(firstPass)
    var movieGetUrl = "https://api.themoviedb.org/3/search/movie?query=" + movieName + "&api_key=5282afd0a67826fac3febca5930766eb&page=" + pageNumber;
    
    //store the current search term in local storage
    //localStorage.setItem("movieName", movieName);
    //get the movie data from the api
    fetch(movieGetUrl, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',

        }
    }).then(function (response) {
        return response.json();
    }).then(function (data) {
        //movieDataJson +=JSON.stringify(data.results);
        //console.log(data);
        //localStorage.setItem("movies-" + movieName, movieDataJson);
        
        // loop through the results and add them to the movies array
        for (var i = 0; i < data.results.length; i++) {
            var movie = {
                id: data.results[i].id,
                title: data.results[i].title,
                overview: data.results[i].overview,
            }
            movies.push(movie);
        }

        currentPage = data.page;
        totalPages = data.total_pages;

        if (totalPages > currentPage)
        {
            getMovieByName(movieName, currentPage + 1);
        }
    })
}






// function getLocalMovieData() {
//     var movieData = JSON.parse(localStorage.getItem("movies"));
//     var currentPage = movieData.page;
//     totalPages = movieData.total_pages;
//     console.log("The current page is: " + currentPage);
//     console.log("The total pages are: " + totalPages);
// }


getMovieByName(movieName, "1");
console.log(movies);