//////////////// getMoviesController 

let moviesController  = (function(UIctrl) {
    const DOM = UIctrl.getDOMStrings();
    let address, data, method, message, token;
    address = 'https://ancient-caverns-16784.herokuapp.com/movies';
    method = 'GET';
    
    let setPagination = function(data) {
        console.log('setPagination:', data);
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

                    // showMovies
                    UIctrl.showMovies(response.results);

                    //
                    UIctrl.setMoviesResponse(response);

                    // showPagination
                    setPagination(response.pagination);

                    // console.log('getMovies is done');
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
