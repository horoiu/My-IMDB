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


// //////////////// movieController 
// here


////////////////// controller

let controller = (function() {
    
    let setupEventListeners = function() {
        const DOM = UIController.getDOMStrings();
        // console.log('DOM: ', DOM)
        
        DOM.headerLoginBtn.onclick = function() {
            DOM.modal.classList.remove('hidden');
            DOM.modalLogin.classList.remove('hidden');
            DOM.loginUser.focus();
            DOM.modalRegister.classList.add('hidden');
            
            UIController.setModalState(true);
        };        
        
        DOM.headerRegisterBtn.onclick = function() {
            DOM.modal.classList.remove('hidden');
            DOM.modalRegister.classList.remove('hidden');
            DOM.registerUser.focus();
            DOM.modalLogin.classList.add('hidden');

            UIController.setModalState(true);
        };
        
        DOM.headerLogoutBtn.onclick = function() {
            userController.logoutRequest();
        };

        DOM.modal.onclick = function(event) {                      
            if (event.target.className === 'modal') {
                UIController.hideModal(); 
            };
        };

        //hide modal and clear fields if ESCape key is pressed 
        window.onkeyup = function(event) {
            let modal = UIController.getModalState();

            if (event.keyCode === 27 && modal) {
                UIController.hideModal();
            };
        };
        
        DOM.loginCancelBtn.onclick = function() {
            UIController.hideModal();
        };

        DOM.loginLoginBtn.onclick = function(event) {
            event.preventDefault();

            if (userController.validateLoginFields()) {
                // console.log('Login fields are valid');
                userController.loginRequest();
            };
        };

        DOM.loginRegisterBtn.onclick = function() {
            UIController.toggleModal();
        };

        DOM.registerCancelBtn.onclick = function() {
            UIController.hideModal();
        };

        DOM.registerLoginBtn.onclick = function() {
            UIController.toggleModal();
        };

        DOM.registerRegisterBtn.onclick = function(event) {
            event.preventDefault();

            if (userController.validateRegisterFields()) {
                // console.log('Register fields are valid');
                userController.registerRequest();
            }; 
        };

    };

    return {

        init: function() {
            console.log('Application has started!');
            moviesController.getMovies();
            
            if (userController.getTokenCookie()) {
                console.log('Initial accessToken: true');
                UIController.toggleHeaderButtons();
            } else {
                console.log('Initial accessToken: false');
            }
            
            setupEventListeners();

            // console.log('initFunction done');
            // console.log(movieData);

        },

    }

})();


controller.init();
