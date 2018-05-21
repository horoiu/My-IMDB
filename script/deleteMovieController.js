let deleteMovieController = (function() {

    let deleteMovie = (id) => {

        let token, header;
        token = userController.getTokenCookie();
        header = new Headers();

        ////////////// - AJAX START
        $(function() {
            $.ajax({
                url: `https://ancient-caverns-16784.herokuapp.com/movies/${id}`,
                type: 'DELETE',
                headers:{'x-auth-token': token},
                success: function(response) {
                    console.log('Movie delete success: ', response);

                    UIController.clearContainer('movie');
                    UIController.clearContainer('movieBtns');
                    
                    // delete data.movieResponse
                    UIController.setData('movieResponse', null);
                    // delete data.movieID
                    UIController.setData('movieID', null);

                    moviesController.getMovies();
                },
                error: function(response) {
                    console.log('Movie DELETE error: ', response.status, response.statusText);
                }
            })
        }); 
        //////////// - END AJAX
    }

    return {
        deleteMovie,
    }
})();