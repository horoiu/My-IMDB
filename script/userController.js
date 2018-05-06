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
                    console.log(`Login success.`);
                    
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
                    console.log(`Register success.`);
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
                    console.log(response);
                    
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