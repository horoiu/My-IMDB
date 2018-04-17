//////////////// UIController 

let UIController  = (function() {

    let DOMStrings = {
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
        modalLoginError: document.querySelector('.modal__login-error'),
        modalRegisterError: document.querySelector('.modal__register-error'),

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
            this.hideAccErrorMessage();
            
            DOMStrings.modal.classList.add('hidden');
            DOMStrings.modalLogin.classList.add('hidden');
            DOMStrings.modalRegister.classList.add('hidden');
        },
        
        toggleModal: function() {
            this.clearAccInputFields();
            this.hideAccErrorMessage();

            DOMStrings.modalLogin.classList.toggle('hidden');
            DOMStrings.modalRegister.classList.toggle('hidden');
        },

        clearAccInputFields: function() {
            DOMStrings.modalLogin.reset();
            DOMStrings.modalRegister.reset();
        },

        showRegisterError: function(message) {
            DOMStrings.modalRegisterError.innerHTML = message;
            DOMStrings.modalRegisterError.classList.remove('hidden');
        },

        showLoginError: function(message) {
            DOMStrings.modalLoginError.innerHTML = message;
            DOMStrings.modalLoginError.classList.remove('hidden');
        },

        hideAccErrorMessage: function() {
            DOMStrings.modalRegisterError.classList.add('hidden');
            DOMStrings.modalLoginError.classList.add('hidden');
        },


    }
})();




////////////////// userController

let userController  = (function(UIctrl) {
    let DOM = UIctrl.getDOMStrings();

    let loginRequest = function() {
        UIctrl.hideAccErrorMessage();

        let user, pass, url, data, method;
        user = DOM.loginUser.value;
        pass = DOM.loginPass.value;
        url = 'https://ancient-caverns-16784.herokuapp.com/auth/login';
        method = 'POST';
        
        data = {
            username: user,
            password: pass,
        };

        ////////////// - AJAX START
        $(function() {
            $.ajax({
                url: url,
                type: method,
                data: data,
                success: function(response) {
                    // console.log(response);

                },
                error: function(response) {
                    let message = response.responseJSON.message;
                    UIctrl.showLoginError(message);
                },
            })
        });
        //////////// - END AJAX
    };

    let logoutRequest = function() {
    };

    let registerRequest = function() {
        UIctrl.hideAccErrorMessage();
        
        let user, pass, url, data, method;
        user = DOM.registerUser.value;
        pass = DOM.registerPass1.value;
        method = 'POST';
        url = 'https://ancient-caverns-16784.herokuapp.com/auth/register';
        
        data = {
            username: user,
            password: pass,
        };
                
        ////////////// - AJAX START
        $(function() {
            $.ajax({
                url: url,
                type: method,
                data: data,
                contentType: 'application/x-www-form-urlencoded',
                success: function(response) {
                    console.log(response);
                },
                error: function(response) {
                    let message = response.responseJSON.message;
                    UIctrl.showRegisterError(message);
                },
            })
        });
        //////////// - END AJAX


        ////////////// - XHR START
        
        // let xhr = new XMLHttpRequest();
        
        // xhr.addEventListener("readystatechange", function () {
        //     if (this.readyState === 4) {
        //         console.log(this.responseText);
        //     }
        // });
        
        // xhr.open("POST", url);
        // xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
        // xhr.send(data);
        
        ////////////// - END XHR
        
        
        
        // //////////// - FETCH START

        // let headers = new Headers;
        // console.log(headers);
        
        // fetch(url, {
        //     method: method,
        //     headers: {
        //         'Content-Type': 'x-www-form-urlencoded; charset=UTF-8',
        //     },
        //     body: JSON.stringify({
        //         username: user,
        //         password: pass,
        //     }),
        // }).then(res => res.json())
        // .then(response => console.log('Success: ', response))
        // .catch(error => console.log('Error: ', error))

        // ////////// - END FETCH
    };

    

    return {

        loginRequest : function() {
            console.log('Loging in');
        },

        validateLoginFields: function() {
            let user, pass;
            user = DOM.loginUser.value;
            pass = DOM.loginPass.value;
    
            if (user === '' || pass === '') {
                let message = 'Fields cannot be empty!';
                UIctrl.showLoginError(message);
                return false;
            } else return true;
        },

        validateRegisterFields: function() {
            let user, pass1, pass2;
            user = DOM.registerUser.value;
            pass1 = DOM.registerPass1.value;
            pass2 = DOM.registerPass2.value;
    
            if (user === '' || pass1 === '' || pass2 === '') {
                let message  = 'Fields cannot be empty!';
                UIctrl.showRegisterError(message);
                return false;
            } else if (pass1 !== pass2) {
                let message  = 'Please check your password!';
                UIctrl.showRegisterError(message);
                return false;
            } else return true;
        },

        loginRequest,
        registerRequest,


    };

})(UIController);

let addMovieController  = (function() {
})(UIController);


let deleteMovieController  = (function() {
})();


let editMovieController  = (function() {
})();

////////////////// controller

let controller = (function(UIctrl, userCtrl) {
    
    let setupEventListeners = function() {
        let DOM = UIctrl.getDOMStrings();
        
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
                console.log('Login fields are valid');
                userCtrl.loginRequest();
            } else {
                console.log('Login fields are invalid');
            }
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
                console.log('Register fields are valid');
                
                userCtrl.registerRequest();
            } else {
                console.log('Register fields are invalid');
            }
        };
    };


    
    return {
        init: function() {
            console.log('Application has started!');

            setupEventListeners();
        },
    }

})(UIController, userController);


controller.init();