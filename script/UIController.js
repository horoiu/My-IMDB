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

    let getDOMStrings = () => {
        return DOMStrings;
    };

    let data = {
        accessToken: {},
        modal: false,
        moviesResponse: {},
        movieResponse: {},
        movieID: '',
    };

    let getData = () => {
        return data;
    };

    let setData = (item, value) => {
        switch (item) {
            case 'accessToken': 
                data.accessToken = value;
                break;
            case 'modal':
                data.modal = value;
                break;
            case 'moviesResponse' :
                data.moviesResponse = value;
                break;
            case 'movieResponse' :
                data.movieResponse = value;
                break;
            case 'movieID' :
                data.movieID = value;
                break;
            default: 
                console.log('UIController data switch error');
        };
    };

    let showMovies = (movies) => {
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

    let setMovieClickEvent = (response) => {
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
    
    let showMovie = (movie) => {
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
                    </div>
                    
                    <div class="content__movie--btns">
                        <ul>
                            <li class="content__movie--btns--back">
                                <span>Go Back</span>
                            </li>
                            <li class="content__movie--btns--add">
                                <span>Add Movie</span>
                            </li>
                            <li class="content__movie--btns--edit">
                                <span>Edit Movie</span>
                            </li>
                            <li class="content__movie--btns--delete">
                                <span>Delete Movie</span>
                            </li>
                        </ul>
                    </div>`
                    
        DOMStrings.movieContainer.innerHTML = item;  
    };

    let getMovieResponse = () => {
        return data.movieResponse;
    };

    let setPagination = (data) => {
        // console.log('setPagination:', data);
        const prevPage = data.links.prev;
        const nextPage = data.links.next;

        DOMStrings.paginPrev.onclick = function() {
            if (prevPage) {
                moviesController.getMovies(prevPage);
            } else return;
        };

        DOMStrings.paginNext.onclick = function() {
            if (nextPage) {
                moviesController.getMovies(nextPage);
            } else return;
        };

        DOMStrings.paginCurr.textContent = `Page ${data.currentPage} of ${data.numberOfPages}`;
    };

    let showPagination = () => {
        DOMStrings.paginationContainer.classList.remove('hidden');
    };

    let hidePagination = () => {
        DOMStrings.paginationContainer.classList.add('hidden');
    };

    let showMovieButtons = () => {
        console.log("inside 'showMovieButtons'");

        if (data.accessToken) {
            // DOMStrings.paginationContainer.classList.remove('hidden'); 
        } else {
            // DOMStrings.paginationContainer.classList.remove('hidden');
        };

    };
    
    let hideMovieButtons = () => {
        console.log("inside 'hideMovieButtons'");

    };

    let clearContainer = (container) => {
        if (container === 'movies') {
            DOMStrings.moviesContainer.innerHTML = '';  
        } else if (container === 'movie') {
            DOMStrings.movieContainer.innerHTML = '';  
        } else return;
    };


    return {

        // setModalState: (state) => {
        //     data.modal = state;
        // },

        getModalState: () => {
            return data.modal;
        },

        hideModal: () => {
            UIController.clearAccInputFields();
            UIController.setData('modal',false);
            UIController.hideModalMessage();
            
            DOMStrings.modal.classList.add('hidden');
            DOMStrings.modalLogin.classList.add('hidden');
            DOMStrings.modalRegister.classList.add('hidden');
        },
        
        toggleModal: () => {
            UIController.clearAccInputFields();
            UIController.hideModalMessage();

            DOMStrings.modalLogin.classList.toggle('hidden');
            DOMStrings.modalRegister.classList.toggle('hidden');
        },

        clearAccInputFields: () => {
            DOMStrings.modalLogin.reset();
            DOMStrings.modalRegister.reset();
        },

        showRegisterMessage: (message, type) => {
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
        
        showLoginMessage: (message, type) => {
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
        
        hideModalMessage: () => {
            DOMStrings.modalLoginMsg.classList.remove('error', 'status');
            DOMStrings.modalLoginMsg.classList.add('hidden');

            DOMStrings.modalRegisterMsg.classList.remove('error', 'status');
            DOMStrings.modalRegisterMsg.classList.add('hidden');
        },

        toggleHeaderButtons: () => {
            DOMStrings.headerLoginBtn.classList.toggle('hidden');
            DOMStrings.headerRegisterBtn.classList.toggle('hidden');
            DOMStrings.headerLogoutBtn.classList.toggle('hidden');
        },
        
        getDOMStrings,
        getData,
        setData,
        setMovieClickEvent,
        showMovies,
        showMovie,
        getMovieResponse,
        setPagination,
        hidePagination,
        showPagination,
        showMovieButtons,
        hideMovieButtons,
        clearContainer

    }
})();


