//////////////// getMoviesController 

let moviesController  = (function(UIctrl) {
    const DOM = UIctrl.getDOMStrings();
    let address, data, method, message, token;
    address = 'https://ancient-caverns-16784.herokuapp.com/movies';
    method = 'GET';
    
    let getMovies = function(genre) {
        if (genre === '' || genre === undefined) {
            url = address;
        } else {
            url = address + "?Genre=" + genre;
        }
        ////////////// - AJAX START
        $(function() {
            $.ajax({
                url: url,
                type: method,
                // data: data,
                success: function(response) {
                    console.log('Movies GET success: ', response);

                    // showMovies
                    UIctrl.showMovies(response.results);

                    // showPagination
                    
                },
                error: function(response) {
                    console.log('Movies GET error: ', response);
                    
                }
            })
        }); 
        //////////// - END AJAX
    };

    let renderMovies = function(movies) {
        console.log(movies.results);
    };

    return {

        getMovies,

    }
    
})(UIController);
