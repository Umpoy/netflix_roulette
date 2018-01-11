
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
            movieElements.each(function () {
                var holdMovieTitle = $(this).find('.title')[0];
                movie.title = $(holdMovieTitle).text();
                movie.image = $(this).find('.iw-boxart').attr('src');
                var holdLink = $(this).find('.action-play')[0];
                movie.link = $(holdLink).attr('href');
                movie.rating = $(this).find('.average_rating').text();
                var holdMovieSynopsis = $(this).find('.synopsis')[0];
                movie.synopsis = $(holdMovieSynopsis).text();
                //here take out the edit made to button spin
                $('.spin').removeClass('spinOnLoad');
                $('.spin').prop('disabled', false);
            });
            renderMovieInfoToDom(movie);
        },
        error: function (err) {
            promise.resolve(err);
        }
    });
    return promise;
}


/***************************************************************************************************
* function name: netflixRouletteButton
* @params {undefined}: none
* @returns: {undefined}: none
* function description: Waits for AJAX by using a spinner
*/
function netflixRouletteButton() {
    grabMoviesFromDataBase();
    //add lines here for making button spin
    $('.spin').addClass('spinOnLoad');
    $('.spin').prop('disabled', true);

}


/***************************************************************************************************
* function name: renderMovieInfoToDom
* @params {undefined} none
* @returns: {undefined} none
* function description: Takes then movie object's values and renders them to the screen
*/
function renderMovieInfoToDom(movie) { // Gets movie info and places them into DOM elements 
    var setDecimalForMovieRating = parseFloat(movie.rating);
    $('.movie_title').text(movie.title);
    $('.movie_poster').attr('src', movie.image);
    $('.play').attr('href', movie.link); // Gives netflix url to button
    $('.movie_description').text(movie.synopsis);
    $('.netflix_rating').text(setDecimalForMovieRating.toFixed(1));
}
