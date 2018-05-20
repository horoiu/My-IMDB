////////////////// userController 
////////////////// only for LogIn / Register / LogOut

let userController  = (function() {
    const DOM = UIController.getDOMStrings();

    let setTokenCookie = (token) => {
        document.cookie = 'accessToken=' +  token;
        UIController.setData('accessToken', token);
    };

    let getTokenCookie = () => {
        let cookieString, cookiesArray, cookies;
            
        cookieString = document.cookie;
        cookiesArray = cookieString.split('; ');
        cookies = {};
        
        cookiesArray.forEach(item => {
            let cookie = item.split('=');
            cookies[cookie[0]] = cookie[1];

            // console.log(cookies);
            // console.log(cookie);
        });

        const accessToken = cookies.accessToken;
        UIController.setData('accessToken', accessToken);

        return accessToken; 
        
        // console.log(`cookieString: ${cookieString}`);
        // console.log(`cookiesArray: ${cookiesArray}`);
        // console.log(`cookies: ${cookies}`); 
    };

    let deleteTokenCookie = () => {
        document.cookie = 'accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC;';
        UIController.setData('accessToken', undefined);
        
    };

    let validateLoginFields = () => {
        let user, pass, message;
        user = DOM.loginUser.value;
        pass = DOM.loginPass.value;
        
        if (user === '' || pass === '') {
            message = 'Fields cannot be empty!';
            UIController.showLoginMessage(message, 'error');
            return false;
        } else return true;
    };

    let validateRegisterFields = () => {
        let user, pass1, pass2, message;
        user = DOM.registerUser.value;
        pass1 = DOM.registerPass1.value;
        pass2 = DOM.registerPass2.value;

        if (user === '' || pass1 === '' || pass2 === '') {
            message  = 'Fields cannot be empty!';
            UIController.showRegisterMessage(message, 'error');
            return false;
        } else if (pass1 !== pass2) {
            message  = 'Please check your password!';
            UIController.showRegisterMessage(message, 'error');
            return false;
        } else return true;
    };

    let loginRequest = () => {
        let user, pass, url, data, message, token;
        user = DOM.loginUser.value;
        pass = DOM.loginPass.value;
        url = 'https://ancient-caverns-16784.herokuapp.com/auth/login';
        
        data = {
            username: user,
            password: pass,
        };

        message = `${user}, please wait!`
        UIController.showLoginMessage(message, 'status');

        ////////////// - AJAX START
        $(function() {
            $.ajax({
                url: url,
                type: 'POST',
                data: data,
                success: function(response) {
                    console.log(`Login success.`);
                    
                    UIController.hideModalMessage();
                    
                    message = `Welcome back ${user}.` ;
                    UIController.showLoginMessage(message, 'status');
                    
                    // setTimeout to hideModal
                    setTimeout(function() {
                        UIController.hideModal()
                    }, 3000);

                    //toggleHeaderButtons
                    UIController.toggleHeaderButtons();

                    //setCookie with token
                    setTokenCookie(response.accessToken);            
                },
                error: function(response) {
                    UIController.hideModalMessage();
                    
                    message = response.responseJSON.message;
                    UIController.showLoginMessage(message, 'error');
                },
            })
        });
        //////////// - END AJAX
    };

    let logoutRequest = () => {
        let token, url, header;
        token = getTokenCookie();
        url = 'https://ancient-caverns-16784.herokuapp.com/auth/logout';
        header = new Headers();

        $(function() {
            $.ajax({
                url: url,
                type: 'GET',
                headers:{'x-auth-token': token},
                success: function(response) {
                    console.log(`Logout success.`);
                    // setTokenCookie('');
                    deleteTokenCookie();
                    UIController.toggleHeaderButtons();
                },
                error: function(response) {
                    console.log(`Logout error: ${response}`)
                },
            })
        });
    };

    let registerRequest = () => {        
        let user, pass, data, message;
        user = DOM.registerUser.value;
        pass = DOM.registerPass1.value;
        
        data = {
            username: user,
            password: pass,
        };
                
        message = `${user}, please wait!`
        UIController.showRegisterMessage(message, 'status');

        ////////////// - AJAX START
        $(function() {
            $.ajax({
                url: 'https://ancient-caverns-16784.herokuapp.com/auth/register',
                type: 'POST',
                data: data,
                contentType: 'application/x-www-form-urlencoded',
                success: function(response) {
                    console.log(`Register success.`);
                    UIController.hideModalMessage();

                    // setTimeout for welcome message
                    message = `Welcome ${user}.` ;
                    UIController.showRegisterMessage(message, 'status');

                    //hideModal
                    setTimeout(function() {
                        UIController.hideModal()
                    }, 3000);

                    //toggle HeaderButtons
                    UIController.toggleHeaderButtons();                    

                    //setCookie with token
                    setTokenCookie(response.accessToken);
                },
                error: function(response) {
                    UIController.hideModalMessage();
                    console.log(response);
                    
                    message = response.responseJSON.message;
                    UIController.showRegisterMessage(message, 'error');
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

        loginRequest,
        logoutRequest,
        registerRequest,
        getTokenCookie,
        validateRegisterFields,
        validateLoginFields,

    };
})();