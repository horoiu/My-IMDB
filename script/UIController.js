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

    };

    let data = {
        modal: false,
    };

    return {

        getDOMStrings: function() {
            return DOMStrings;
        },

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

        showMovies: function(movies) {
            // console.log('showMovies: ', movies[0]);
            let html, container, i  ;
            html = '';     

            for (i = 0; i <= movies.length-1; i++ ) {             
                let movie = `<div class="content__movies-movie movie-${i+1} id="${movies[i]._id}"> 
                                <img class="content__movies-movie--img" src="${movies[i].Poster}"       
                                <a class="content__movies-movie--link" href="#">
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


            // let Movie = function(defaultData) {
            //     defaultData ? defaultData : {};
            //     this.Country = defaultData.Country;
            //     this.Genre = defaultData.Genre;
            //     this.Language = defaultData.Language;
            //     this.Poster = defaultData.Poster;
            //     this.Runtime = defaultData.Runtime;
            //     this.Title = defaultData.Title;
            //     this.Type = defaultData.Type;
            //     this.Year = defaultData.Year;
            //     this.imdbID = defaultData.imdbID;
            //     this.imdbRating = defaultData.imdbRating;
            //     this.imdbVotes = defaultData.imdbVotes;
            //     this.id = defaultData._id;
            // };

            
        },
    }
})();


