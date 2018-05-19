//////////////// UIController 

let UIController  = (function() {

    const DOMStrings = {
        headerLoginBtn: document.querySelector('.header__btn--login'),
        headerLogoutBtn: document.querySelector('.header__btn--logout'),
        headerRegisterBtn: document.querySelector('.header__btn--register'),
        registerUser: document.querySelector('.modal__register-inputs--user'),
        registerPass1: document.querySelector('.modal__register-inputs--pass1'),
        registerPass2: document.querySelector('.modal__register-inputs--pass2'),
        registerLoginBtn: document.querySelector('.modal__register-buttons--login'),
        registerRegisterBtn: document.querySelector('.modal__register-buttons--register'),
        registerCancelBtn: document.querySelector('.modal__register-buttons--cancel'),
        loginUser: document.querySelector('.modal__login-inputs--user'),
        loginPass: document.querySelector('.modal__login-inputs--pass'),
        loginLoginBtn: document.querySelector('.modal__login-buttons--login'),
        loginRegisterBtn: document.querySelector('.modal__login-buttons--register'),
        loginCancelBtn: document.querySelector('.modal__login-buttons--cancel'),
        modal: document.querySelector('.modal'),
        modalLogin: document.querySelector('.modal__login'),
        modalRegister: document.querySelector('.modal__register'),
        modalLoginMsg: document.querySelector('.modal__login-msg'),
        modalRegisterMsg: document.querySelector('.modal__register-msg'),
        moviesContainer: document.querySelector('.content__movies'),
        movieContainer: document.querySelector('.content__movie'),
        paginationContainer: document.querySelector('.content__pagination'),
        paginPrev: document.querySelector('.content__pagination-btns--prev'),
        paginCurr: document.querySelector('.content__pagination-btns--curr'),
        paginNext: document.querySelector('.content__pagination-btns--next'),

    };

    let getDOMStrings = function() {
        return DOMStrings;
    };

    let data = {
        modal: false,
        moviesResponse: {},
        movieResponse: {},
        movieID: '',
    };

    let getData = function() {
        return data;
    };

    let showMovies = function(movies) {
        // console.log('showMovies: ', movies[0]);
        let html, container, i  ;
        html = '';     

        for (i = 0; i <= movies.length-1; i++ ) {             
            let movie = `<div class="content__movies-movie movie-${i+1}" id="${movies[i]._id}"> 
                            <img class="content__movies-movie--img" src="${movies[i].Poster}">       
                            <a class="content__movies-movie--link">
                                <div class="content__movies-movie--rating">
                                    
                                    <p class="star">&starf;</p>
                                    <div>
                                        <p class="ratings">
                                            <span>${movies[i].imdbRating}</span>
                                            <span>/ 10</span>
                                        </p>
                                        <p class="voters">${movies[i].imdbVotes}</p>
                                    </div>
                                    
                                </div>
                                
                                <h1 class="content__movies-movie--title">
                                ${movies[i].Title} &nbsp;
                                </h1>
                                
                                <div class="content__movies-movie--details">
                                    <p>
                                        <span>${movies[i].Year} &nbsp;</span>
                                        <span>&nbsp; ${movies[i].Runtime}</span>
                                    </p>
                                    <p>&nbsp; ${movies[i].Genre} &nbsp;</p>
                                </div>
                            </a>       
                        </div>`

            html += movie;  
        };
                    
        DOMStrings.moviesContainer.innerHTML = html;  
    };

    let setMovieClickEvent = function(response) {
        // console.log('movieClick response: ', response);

        let movies = DOMStrings.moviesContainer.querySelectorAll(".content__movies-movie");

        for (let i = 0; i < movies.length; i++) {
            // console.log(movies[i]);
            movies[i].addEventListener('click', function() {
                // clickEvent(movies[i].id);
                data.movieID = movies[i].id;
                movieController.getMovie(movies[i].id);
            });
        };
    };
    
    let showMovie = function(movie) {
        console.log('UIController - showMovie: ', movie);   

        //save response with movie details inside 'data' object
        data.movieResponse = movie;

        // clear render container: delete movies & hide pagination
        clearContainer('movies');
        hidePagination();


           
        let item = `<div class="content__movie--details" id="${movie._id}"> 

                        <div class="content__movie--img">
                            <img src="${movie.Poster}"> 
                        </div>

                        <div class="content__movie--info">
                            
                            <h1 class="content__movie--info-title">
                                ${movie.Title}
                            </h1>

                            <p class="content__movie--info-director">
                                <span>Director: </span>
                                <span>${movie.Director}</span>
                            </p>
                            <p class="content__movie--info-actors">
                                <span>Actors: </span>
                                <span>${movie.Actors}</span>
                            </p>
                            <p class="content__movie--info-genre">
                                <span>Genre: </span>
                                <span>${movie.Genre}</span>
                            </p>
                            <p class="content__movie--info-rated">
                                <span>Rated: </span>
                                <span>${movie.Rated}</span>
                            </p>
                            <p class="content__movie--info-runtime">
                                <span>Runtime: </span>
                                <span>${movie.Runtime}</span>
                            </p>
                            <p class="content__movie--info-awards">
                                <span>Awards: </span>
                                <span>${movie.Awards}</span>
                            </p>
                            <p class="content__movie--info-released">
                                <span>Release date: </span>
                                <span>${movie.Released}</span>
                            </p>
                            <p class="content__movie--info-ratings">
                                <span>IMDB Rating: </span>
                                <span>${movie.imdbRating} out of ${movie.imdbVotes} votes</span>
                            </p>
                            <p class="content__movie--info-production">
                                <span>Production: </span>
                                <span>${movie.Production}</span>
                            </p>
                            <p class="content__movie--info-writer">
                                <span>Writer: </span>
                                <span>${movie.Writer}</span>
                            </p>
                            </br>
                            <p class="content__movie--info-plot">
                                <span>Description: </span>
                                <span>${movie.Plot}</span>
                            </p>
                            
                        </div>
                        
                        

                    </div>`
                    



        DOMStrings.movieContainer.innerHTML = item;  
    };

    let hidePagination = function() {
        DOMStrings.paginationContainer.classList.add('hidden');
    };
    
    let showPagination = function() {
        DOMStrings.paginationContainer.classList.remove('hidden');
    };

    let clearContainer = function(container) {
        if (container === 'movies') {
            DOMStrings.moviesContainer.innerHTML = '';  
        } else if (container === 'movie') {
            DOMStrings.movieContainer.innerHTML = '';  
        } else return;
    };


    return {

        setModalState: function(state) {
            data.modal = state;
        },

        getModalState: function() {
            return data.modal;
        },

        hideModal: function() {
            this.clearAccInputFields();
            this.setModalState(false);
            this.hideModalMessage();
            
            DOMStrings.modal.classList.add('hidden');
            DOMStrings.modalLogin.classList.add('hidden');
            DOMStrings.modalRegister.classList.add('hidden');
        },
        
        toggleModal: function() {
            this.clearAccInputFields();
            this.hideModalMessage();

            DOMStrings.modalLogin.classList.toggle('hidden');
            DOMStrings.modalRegister.classList.toggle('hidden');
        },

        clearAccInputFields: function() {
            DOMStrings.modalLogin.reset();
            DOMStrings.modalRegister.reset();
        },

        showRegisterMessage: function(message, type) {
            DOMStrings.modalRegisterMsg.innerHTML = message;

            if(type === 'error') {
                // console.log('Register IF');
                DOMStrings.modalRegisterMsg.classList.add('error');
            } else if (type === 'status') {
                // console.log('Register ELSE');
                DOMStrings.modalRegisterMsg.classList.add('status');
            }
            
            DOMStrings.modalRegisterMsg.classList.remove('hidden');
        },
        
        showLoginMessage: function(message, type) {
            DOMStrings.modalLoginMsg.innerHTML = message;
            
            if(type === 'error') {
                // console.log('Login IF');
                DOMStrings.modalLoginMsg.classList.add('error');
            } else if (type === 'status') {
                // console.log('Login ELSE');
                DOMStrings.modalLoginMsg.classList.add('status');
            }
            
            DOMStrings.modalLoginMsg.classList.remove('hidden');
        },
        
        hideModalMessage: function() {
            DOMStrings.modalLoginMsg.classList.remove('error', 'status');
            DOMStrings.modalLoginMsg.classList.add('hidden');

            DOMStrings.modalRegisterMsg.classList.remove('error', 'status');
            DOMStrings.modalRegisterMsg.classList.add('hidden');
        },

        toggleHeaderButtons: function() {
            DOMStrings.headerLoginBtn.classList.toggle('hidden');
            DOMStrings.headerRegisterBtn.classList.toggle('hidden');
            DOMStrings.headerLogoutBtn.classList.toggle('hidden');
        },

        setMoviesResponse: function(response) {
            data.moviesResponse = response;
        },

        getDOMStrings,
        getData,
        setMovieClickEvent,
        showMovies,
        showMovie,
        hidePagination,
        showPagination,
        clearContainer

        

        

    }
})();


