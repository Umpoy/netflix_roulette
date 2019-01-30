// $(document).ready(initializeApp)
// let view = null;
// let model = null;


// function initializeApp() {
//     model = new Model();
//     view = new View();
//     assignClickHandlers();
//     model.grab_movies_from_data_base();
// }

// function assignClickHandlers() {
//     $('.spin').on('click', view.ask_for_new_movie)
// }

// function Model() {
//     this.movie = {};
//     this.grab_movies_from_data_base = function () {
//         let promise = {
//             then: function (resolve, reject) {
//                 this.resolve = resolve;
//                 this.reject = reject;
//             }
//         };
//         $.ajax({
//             url: './server/getCurrentMovies.php',
//             dataType: 'text',
//             method: 'get',
//             success: function (serverData) {
//                 let shadow_dom = new DOMParser().parseFromString(server_data, "text/html");
//                 let movie_elements = $(shadow_dom).find('.iw-container');
//                 movie_elements.each(function () {
//                     let hold_movie_title = $(this).find('.title')[0];
//                     movie.title = $(hold_movie_title).text();
//                     movie.image = $(this).find('.iw-boxart').attr('src');
//                     let hold_link = $(this).find('.action-play')[0];
//                     movie.link = $(hold_link).attr('href');
//                     movie.rating = $(this).find('.average_rating').text();
//                     let hold_movie_synopsis = $(this).find('.synopsis')[0];
//                     movie.synopsis = $(hold_movie_synopsis).text();
//                 });
//                 view.render_movie_to_dom(this.movie);
//             },
//             error: function (err) {
//                 promise.resolve(err);
//             }
//         });
//         return promise;
//     }
// }

// function View() {
//     this.ask_for_new_movie = model.grab_movies_from_data_base();
//     this.render_movie_to_dom = function (movie) {
//         $('.movie_title').text(movie.title);
//         $('.movie_poster').attr('src', movie.image);
//         $('.play').attr('href', movie.link); // Gives netflix url to button
//         $('.movie_description').text(movie.synopsis);
//     }
// }