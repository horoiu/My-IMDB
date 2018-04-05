console.log("JS LOADED");







let UIController  = (function() {

    let DOMStrings = {
        loginBtn: document.querySelector('.header__btn-box--login'),
        logoutBtn: document.querySelector('.header__btn-box--logout'),
        registerBtn: document.querySelector('.header__btn-box--register'),

    };

    return {
        getDOMStrings: function() {
            return DOMStrings;
        },
    }

})();





let userController  = (function() {

    let loginRequest = function() {
        
    }

})();





let addMovieController  = (function() {

})(UIController);





let deleteMovieController  = (function() {

})();




let editMovieController  = (function() {

})();






let controller = (function(UIctrl, userCtrl) {
    
    let setupEventListeners = function() {
        let DOM = UIctrl.getDOMStrings();

        DOM.loginBtn.addEventListener('click', userCtrl);

        console.log(DOM);
    }
    
    return {
        init: function() {
            console.log('Application has started!');

            setupEventListeners();

        },
    }

})(UIController, userController);


controller.init();