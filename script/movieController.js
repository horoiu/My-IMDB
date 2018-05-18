//////////////// showMovieController 

let movieController  = (function(UIctrl) {
    const DOM = UIctrl.getDOMStrings();
    
    let getMovie = function(id) {

        ////////////// - AJAX START
        $(function() {
            $.ajax({
                url: `https://ancient-caverns-16784.herokuapp.com/movies/${id}`,
                type: 'GET',
                // data: data,
                success: function(response) {
                    // console.log('Movie GET success: ', response);

                    UIctrl.showMovie(response);





                    // // showMovies
                    // UIctrl.showMovies(response.results);

                    // //
                    // UIctrl.setMoviesResponse(response);

                    // // showPagination
                    // setPagination(response.pagination);

                    // // console.log('getMovies is done');
                },
                error: function(response) {
                    console.log('Movie GET error: ', response);
                    
                }
            })
        }); 
        //////////// - END AJAX
    };

    return {

        getMovie,

    }
    
})(UIController);
