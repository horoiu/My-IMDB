//////////////// getMoviesController 

let moviesController  = (function() {
    const DOM = UIController.getDOMStrings();
    let address, data, method, message, token;
    address = 'https://ancient-caverns-16784.herokuapp.com/movies';
    method = 'GET';
    
    let setPagination = function(data) {
        // console.log('setPagination:', data);
        const prevPage = data.links.prev;
        const nextPage = data.links.next;

        DOM.paginPrev.onclick = function() {
            if (prevPage) {
                getMovies(prevPage);
            } else return;
        };

        DOM.paginNext.onclick = function() {
            if (nextPage) {
                getMovies(nextPage);
            } else return;
        };

        DOM.paginCurr.textContent = `Page ${data.currentPage} of ${data.numberOfPages}`;
    }

    let getMovies = function(link) {
        if (link === '' || link === undefined) {
            url = address;
        } else {
            url = link;
        }
        ////////////// - AJAX START
        $(function() {
            $.ajax({
                url: url,
                type: method,
                // data: data,
                success: function(response) {
                    // console.log('Movies GET success: ', response);
                    
                    // save response in UIController variable
                    UIController.setMoviesResponse(response);

                    // showMovies
                    UIController.showMovies(response.results);

                    
                    // showPagination
                    setPagination(response.pagination);
                    
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
