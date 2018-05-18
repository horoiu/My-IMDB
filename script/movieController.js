//////////////// showMovieController 

let movieController  = (function(UIctrl) {
    const DOM = UIctrl.getDOMStrings();
    
    
    let showMovie = function() {
        console.log('inside movieController');
    };


    // let address, data, method, message, token;
    // address = 'https://ancient-caverns-16784.herokuapp.com/movies';
    // method = 'GET';
    

    // let getMovie = function(link) {
    //     if (link === '' || link === undefined) {
    //         url = address;
    //     } else {
    //         url = link;
    //     }
    //     ////////////// - AJAX START
    //     $(function() {
    //         $.ajax({
    //             url: url,
    //             type: method,
    //             // data: data,
    //             success: function(response) {
    //                 // console.log('Movies GET success: ', response);

    //                 // showMovies
    //                 UIctrl.showMovies(response.results);

    //                 //
    //                 UIctrl.setMoviesResponse(response);

    //                 // showPagination
    //                 setPagination(response.pagination);

    //                 // console.log('getMovies is done');
    //             },
    //             error: function(response) {
    //                 console.log('Movies GET error: ', response);
                    
    //             }
    //         })
    //     }); 
    //     //////////// - END AJAX
    // };

    return {

        showMovie,

    }
    
})(UIController);
