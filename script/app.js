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
    }
})();




////////////////// userController

let userController  = (function(UIctrl) {
    const DOM = UIctrl.getDOMStrings();

    let setTokenCookie = function(token) {
        document.cookie = 'accessToken=' +  token;
    };

    let getTokenCookie = function() {
        let cookieString, cookiesArray, cookies;
            
        cookieString = document.cookie;
        cookiesArray = cookieString.split('; ');
        cookies = {};
        
        cookiesArray.forEach(function(item) {
            let cookie= item.split('=');
            cookies[cookie[0]] = cookie[1];

            // console.log(cookies);
            // console.log(cookie);
        });

        const accessToken = cookies.accessToken;
        
        return accessToken; 
        
        // console.log(`cookieString: ${cookieString}`);
        // console.log(`cookiesArray: ${cookiesArray}`);
        // console.log(`cookies: ${cookies}`); 
    };

    let deleteTokenCookie = function() {
        document.cookie = 'accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC;';
    };

    let loginRequest = function() {
        let user, pass, url, data, method, message, token;
        user = DOM.loginUser.value;
        pass = DOM.loginPass.value;
        url = 'https://ancient-caverns-16784.herokuapp.com/auth/login';
        method = 'POST';
        
        data = {
            username: user,
            password: pass,
        };

        message = `${user}, please wait!`
        UIctrl.showLoginMessage(message, 'status');

        ////////////// - AJAX START
        $(function() {
            $.ajax({
                url: url,
                type: method,
                data: data,
                success: function(response) {
                    UIctrl.hideModalMessage();
                    
                    message = `Welcome back ${user}.` ;
                    UIctrl.showLoginMessage(message, 'status');
                    
                    // setTimeout to hideModal
                    setTimeout(function() {
                        UIctrl.hideModal()
                    }, 3000);

                    //toggleHeaderButtons
                    UIctrl.toggleHeaderButtons();

                    //setCookie with token
                    setTokenCookie(response.accessToken);            
                },
                error: function(response) {
                    UIctrl.hideModalMessage();
                    
                    message = response.responseJSON.message;
                    UIctrl.showLoginMessage(message, 'error');
                },
            })
        });
        //////////// - END AJAX
    };

    let logoutRequest = function() {
        let token, url, method, header;
        token = getTokenCookie();
        url = 'https://ancient-caverns-16784.herokuapp.com/auth/logout';
        method: 'GET';
        header = new Headers();

        $(function() {
            $.ajax({
                url: url,
                type: method,
                headers:{'x-auth-token': token},
                success: function(response) {
                    console.log(`Logout success.`);
                    // setTokenCookie('');
                    deleteTokenCookie();
                    UIctrl.toggleHeaderButtons();
                },
                error: function(response) {
                    console.log(`Logout error: ${response}`)
                },
            })
        });
    };

    let registerRequest = function() {        
        let user, pass, url, data, method, message;
        user = DOM.registerUser.value;
        pass = DOM.registerPass1.value;
        method = 'POST';
        url = 'https://ancient-caverns-16784.herokuapp.com/auth/register';
        
        data = {
            username: user,
            password: pass,
        };
                
        message = `${user}, please wait!`
        UIctrl.showRegisterMessage(message, 'status');

        ////////////// - AJAX START
        $(function() {
            $.ajax({
                url: url,
                type: method,
                data: data,
                contentType: 'application/x-www-form-urlencoded',
                success: function(response) {
                    console.log(response);
                    UIctrl.hideModalMessage();

                    // setTimeout for welcome message
                    message = `Welcome ${user}.` ;
                    UIctrl.showRegisterMessage(message, 'status');

                    //hideModal
                    setTimeout(function() {
                        UIctrl.hideModal()
                    }, 3000);

                    //toggle HeaderButtons
                    UIctrl.toggleHeaderButtons();                    

                    //setCookie with token
                    setTokenCookie(response.accessToken);
                },
                error: function(response) {
                    UIctrl.hideModalMessage();
                    
                    message = response.responseJSON.message;
                    UIctrl.showRegisterMessage(message, 'error');
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

        validateLoginFields: function() {
            let user, pass, message;
            user = DOM.loginUser.value;
            pass = DOM.loginPass.value;
            
            if (user === '' || pass === '') {
                message = 'Fields cannot be empty!';
                UIctrl.showLoginMessage(message, 'error');
                return false;
            } else return true;
        },

        validateRegisterFields: function() {
            let user, pass1, pass2, message;
            user = DOM.registerUser.value;
            pass1 = DOM.registerPass1.value;
            pass2 = DOM.registerPass2.value;
    
            if (user === '' || pass1 === '' || pass2 === '') {
                message  = 'Fields cannot be empty!';
                UIctrl.showRegisterMessage(message, 'error');
                return false;
            } else if (pass1 !== pass2) {
                message  = 'Please check your password!';
                UIctrl.showRegisterMessage(message, 'error');
                return false;
            } else return true;
        },


        loginRequest,
        logoutRequest,
        registerRequest,
        getTokenCookie,

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
        const DOM = UIctrl.getDOMStrings();
        
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
            
            setupEventListeners();

            if (userCtrl.getTokenCookie()) {
                console.log('Inititial accessToken: true');
                UIctrl.toggleHeaderButtons();
            } else {
                console.log('Initial accessToken: false');
            }
        },
    }

})(UIController, userController);


controller.init();