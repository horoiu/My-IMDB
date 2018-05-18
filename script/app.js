// //////////////// UIController 
// here


// ////////////////// userController
// here



let addMovieController  = (function() {
})();


let deleteMovieController  = (function() {
})();


let editMovieController  = (function() {
})();


// //////////////// getMoviesController 
// here


// //////////////// showMoviesController 
// here


////////////////// controller

let controller = (function(UIctrl, userCtrl, moviesCtrl) {
    
    let setupEventListeners = function() {
        const DOM = UIctrl.getDOMStrings();
        // console.log('DOM: ', DOM)
        
        DOM.headerLoginBtn.onclick = function() {
            DOM.modal.classList.remove('hidden');
            DOM.modalLogin.classList.remove('hidden');
            DOM.loginUser.focus();
            DOM.modalRegister.classList.add('hidden');
            
            UIctrl.setModalState(true);
        };        
        
        DOM.headerRegisterBtn.onclick = function() {
            DOM.modal.classList.remove('hidden');
            DOM.modalRegister.classList.remove('hidden');
            DOM.registerUser.focus();
            DOM.modalLogin.classList.add('hidden');

            UIctrl.setModalState(true);
        };
        
        DOM.headerLogoutBtn.onclick = function() {
            userCtrl.logoutRequest();
        };

        DOM.modal.onclick = function(event) {                      
            if (event.target.className === 'modal') {
                UIctrl.hideModal(); 
            };
        };

        //hide modal and clear fields if ESCape key is pressed 
        window.onkeyup = function(event) {
            let modal = UIctrl.getModalState();

            if (event.keyCode === 27 && modal) {
                UIctrl.hideModal();
            };
        };
        
        DOM.loginCancelBtn.onclick = function() {
            UIctrl.hideModal();
        };

        DOM.loginLoginBtn.onclick = function(event) {
            event.preventDefault();

            if (userCtrl.validateLoginFields()) {
                // console.log('Login fields are valid');
                userCtrl.loginRequest();
            };
        };

        DOM.loginRegisterBtn.onclick = function() {
            UIctrl.toggleModal();
        };

        DOM.registerCancelBtn.onclick = function() {
            UIctrl.hideModal();
        };

        DOM.registerLoginBtn.onclick = function() {
            UIctrl.toggleModal();
        };

        DOM.registerRegisterBtn.onclick = function(event) {
            event.preventDefault();

            if (userCtrl.validateRegisterFields()) {
                // console.log('Register fields are valid');
                userCtrl.registerRequest();
            }; 
        };

    };

    return {

        init: function() {
            console.log('Application has started!');
            moviesCtrl.getMovies();
            
            if (userCtrl.getTokenCookie()) {
                console.log('Initial accessToken: true');
                UIctrl.toggleHeaderButtons();
            } else {
                console.log('Initial accessToken: false');
            }
            
            setupEventListeners();
            console.log('initFunction done');
            // console.log(movieData);
        },

    }

})(UIController, userController, moviesController);


controller.init();