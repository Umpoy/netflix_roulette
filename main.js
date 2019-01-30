
$(document).ready(initializeApp)

function initializeApp() {
    assignClickHandlers();
    grabMoviesFromDataBase();
}

function assignClickHandlers() {
    $('.spin').on('click', grabMoviesFromDataBase)
}

function grabMoviesFromDataBase() {
    var promise = {
        then: function (resolve, reject) {
            this.resolve = resolve;
            this.reject = reject;
        }
    };
    $.ajax({
        url: './server/getCurrentMovies.php',
        dataType: 'text',
        method: 'get',
        success: function (serverData) {
            var movie = {};
            var shadowDom = new DOMParser().parseFromString(serverData, "text/html");
            var movieElements = $(shadowDom).find('.iw-container');
            console.log("shadowDom: ", shadowDom);
            console.log("movieElements: ", movieElements);
            var holdMovieTitle = $(this).find('.title')[0];
            movie.title = $(holdMovieTitle).text();
            movie.image = $(this).find('.iw-boxart').attr('src');
            var holdLink = $(this).find('.action-play')[0];
            movie.link = $(holdLink).attr('href');
            movie.rating = $(this).find('.average_rating').text();
            var holdMovieSynopsis = $(this).find('.synopsis')[0];
            movie.synopsis = $(holdMovieSynopsis).text();
            renderMovieInfoToDom(movie);
        },
        error: function (err) {
            promise.resolve(err);
        }
    });
    return promise;
}

function netflixRouletteButton() {
    grabMoviesFromDataBase();
}

function renderMovieInfoToDom(movie) { // Gets movie info and places them into DOM elements 
    $('.movie_title').text(movie.title);
    $('.movie_poster').attr('src', movie.image);
    $('.play').attr('href', movie.link); // Gives netflix url to button
    $('.movie_description').text(movie.synopsis);
}
