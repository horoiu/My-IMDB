//////////////// getMoviesController 

let moviesController  = (function() {

    const DOM = UIController.getDOMStrings();
    let address = 'https://ancient-caverns-16784.herokuapp.com/movies';

    let getMovies = (link) => {
        if (link === '' || link === undefined) {
            url = address;
        } else {
            url = link;
        }
        ////////////// - AJAX START
        $(function() {
            $.ajax({
                url: url,
                type: 'GET',
                success: function(response) {
                    // console.log('Movies GET success: ', response);
                    
                    // save response in UIController variable
                    UIController.setData('moviesResponse', response);

                    // showMovies
                    UIController.showMovies(response.results);

                    
                    // showPagination
                    UIController.showPagination();


                    // set pagination links
                    UIController.setPagination(response.pagination);
                    
                    //set eventListener on each movie
                    UIController.setMovieClickEvent(response.results);



                    // // history manipulation for browser navigation back/forward buttons
                    
                    // let location = `page${response.pagination.currentPage}of${response.pagination.numberOfPages}`;
                    // // console.log(location);
                    // history.pushState({},'', location);





                    // console.log('getMovies is done');
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
})();
