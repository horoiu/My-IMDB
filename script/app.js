////////////////// appController

let controller = (function() {
    
    let setupEventListeners = () => {
        const DOM = UIController.getDOMStrings();
        // console.log('DOM: ', DOM)
        
        DOM.headerLoginBtn.onclick = () => {
            DOM.modal.classList.remove('hidden');
            DOM.modalLogin.classList.remove('hidden');
            DOM.loginUser.focus();
            DOM.modalRegister.classList.add('hidden');
            
            UIController.setData('modal', true);
        };        
        
        DOM.headerRegisterBtn.onclick = () => {
            DOM.modal.classList.remove('hidden');
            DOM.modalRegister.classList.remove('hidden');
            DOM.registerUser.focus();
            DOM.modalLogin.classList.add('hidden');

            UIController.setData('modal', true);
        };
        
        DOM.headerLogoutBtn.onclick = () => {
            userController.logoutRequest();
        };

        DOM.headerAddMovieBtn.addEventListener('click', () => {
            UIController.clearContainer('movie');
            UIController.clearContainer('movies');
            UIController.clearContainer('movieBtns');
            UIController.clearContainer('pagination');
            addMovieController.addMovie();
        });

        DOM.modal.onclick = (event) => {                     
            if (event.target.className === 'modal') {
                UIController.hideModal(); 
            };
        };

        //hide modal and clear fields if ESCape key is pressed 
        window.onkeyup = (event) => {
            let modal = UIController.getModalState();

            if (event.keyCode === 27 && modal) {
                UIController.hideModal();
            };
        };
        
        DOM.loginCancelBtn.onclick = () => {
            UIController.hideModal();
        };

        DOM.loginLoginBtn.onclick = (event) => {
            event.preventDefault();

            if (userController.validateLoginFields()) {
                // console.log('Login fields are valid');
                userController.loginRequest();
            };
        };

        DOM.loginRegisterBtn.onclick = () => {
            UIController.toggleModal();
        };

        DOM.registerCancelBtn.onclick = () => {
            UIController.hideModal();
        };

        DOM.registerLoginBtn.onclick = () => {
            UIController.toggleModal();
        };

        DOM.registerRegisterBtn.onclick = (event) => {
            event.preventDefault();

            if (userController.validateRegisterFields()) {
                // console.log('Register fields are valid');
                userController.registerRequest();
            }; 
        };

    };

    return {

        init: () => {
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
