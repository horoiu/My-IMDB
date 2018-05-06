//////////////// getMovieController 

let getMovieController  = (function(UIctrl) {
    const DOM = UIctrl.getDOMStrings();
    let address, data, method, message, token;
    address = 'https://ancient-caverns-16784.herokuapp.com/movies';
    method = 'GET';
    
    let getMovies = function(genre) {
        if (genre === '' || genre === undefined) {
            url = address;
        } else {
            url = adress + genre;
        }
        ////////////// - AJAX START
        $(function() {
            $.ajax({
                url: url,
                type: method,
                // data: data,
                success: function(response) {
                    console.log('Movies GET success: ', response);
                    return response;
                },
                error: function(response) {
                    console.log('Movies GET error: ', response);
                    
                }
            })
        }); 
        //////////// - END AJAX
    };

    return {
        getMovies,
    }
    
})(UIController);
