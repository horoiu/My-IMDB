//////////////// showMovieController 

let movieController  = (function() {

    const DOM = UIController.getDOMStrings();
    
    let getMovie = (id) => {

        ////////////// - AJAX START
        $(function() {
            $.ajax({
                url: `https://ancient-caverns-16784.herokuapp.com/movies/${id}`,
                type: 'GET',
                success: function(response) {
                    // console.log('Movie GET success: ', response);

                    UIController.showMovie(response);

                    // save the response in UIController 'data' object
                    UIController.setData('movieResponse', response);

                    // // show movie buttons
                    UIController.showMovieButtons();

                    // // console.log('getMovie is done');
                },
                error: function(response) {
                    console.log('Movie GET error: ', response.status, response.statusText);
                }
            })
        }); 
        //////////// - END AJAX
    };

    return {
        getMovie,
    }  
})();
