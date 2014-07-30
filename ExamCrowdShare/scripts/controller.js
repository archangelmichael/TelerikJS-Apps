define(['http-requester', 'validation-controller', 'ui', 'crypto'], function(HttpRequester, ValidationController, UI, Crypto) {
    'use strict';

    var Controller = (function() {
        var $error = $('#error-msg');
        var $messageInput = $('#user-message');
        var _isLoggedIn = false;
        var _username = -1;
        var _password = -1;
        var _authCode = '';
        var _sessionKey = '';

        var Controller = function(resourceUrl) {
            this.postUrl = resourceUrl + '/post';
            this.userUrl = resourceUrl + '/user';
            this.loginUrl = resourceUrl + '/auth';
            this.refreshTimeMS = 2000;
            this.showLastMessagesCount = 200;
        };

        Controller.prototype.getUsername = function() {
            return _username;
        };

        Controller.prototype.isLoggedIn = function() {
            return _isLoggedIn;
        };

        Controller.prototype.loadChatBox = function(url) {
            var _this = this;
            var useUrl = url || _this.postUrl;
            makeRequest(useUrl, _this);
            setInterval(function() {
                UI.appendMessages();
            }, _this.refreshTimeMS);
        };

        Controller.prototype.loadLoginForm = function() {
            $('#wrapper').load('views/login-template.html', function () {
                $('#login-password').val('');
            })
        };

        Controller.prototype.loadChat = function() {
            $('#wrapper').load('views/chat-template.html', function () {
                $('.username-box').html('Welcome, '+ _username.toUpperCase());
            })
        };

        Controller.prototype.setEventHandler = function() {
            var _this = this,
                $wrapper = $('#wrapper');

            $wrapper.on('click', '#login-btn', function() {
                logIn(_this);
            });

            $wrapper.on('click', '#exit-btn', function() {
                logOut(_this);
            });

            $wrapper.on('click', '#register-btn', function() {
                register(_this);
            });

            $wrapper.on('click', '#submitmsg', function() {
                sendMessage(_this);
            });

            $('#sort-btn').on('click', function() {
                UI.sortMessages();
            });

            $('#filter-btn').on('click', function() {
                var filter = UI.filterMessages();
                console.log(filter);
                makeRequest(_this.postUrl + filter, _this);
            });
        };

        function register(obj) {
            var _this = obj;
            getUserAndPass();
            var user = _this.getUsername();
            if(user === -1) {
                return;
            }

            HttpRequester.registerUser(_this.userUrl, {
                username: user,
                authCode: _authCode
            })
                .then(function() {
                    showMessage("User Registered", "OK");
                    $('#usermsg').val('');
                }, function(err) {
                    showMessage("Error",err);
                    window.location = '#/login';
                });
        }

        function logIn(obj) {
            var _this = obj;
            getUserAndPass();
            var user = _this.getUsername();
            if(user === -1) {
                return;
            }

            HttpRequester.loginUser(_this.loginUrl, {
                username: user,
                authCode: _authCode
            })
                .then(function(data) {
                    showMessage("Success", "User Logged!", 'OK');
                    $messageInput.val('');
                    _isLoggedIn = true;
                    _sessionKey = data.sessionKey;
                    window.location = '#/chat';
                }, function(err) {
                    showMessage("Error",err);
                    _isLoggedIn = false;
                    window.location = '#/login';
                });
        }

        function sendMessage(obj) {
            var _this = obj;
            var data = getUserMessage();
            if(!data) {
                return;
            }

            HttpRequester.sendPost(_this.postUrl, {
                title: data.title,
                body: data.body
            }, {
                'X-SessionKey': _sessionKey
            })
                .then(function() {
                    showMessage("Success","Message Sent!!", 'OK');
                    $('#user-title').val('');
                    $('#user-message').val('');
                    _this.loadChatBox();
                }, function(err) {
                    showMessage("Error",err);
                });
        }

        function logOut(obj) {
            var _this = obj;
            HttpRequester.logoutUser(_this.userUrl, undefined , {
                'X-SessionKey': _sessionKey
            })
                .then(function() {
                    window.location = '#/login';
                    _this.loadLoginForm();
                    showMessage("Success", "User Logged Out!", 'OK');
                    _username = '-1';
                    _authCode = '';
                    _sessionKey = '';
                    _isLoggedIn = false;
                }, function(err) {
                    window.location = '#/chat';
                    _this.loadChat();
                    showMessage("Error", err);
                    _isLoggedIn = true;
                })
        }

        function showMessage(type, body, log) {
            if(log) {
                $error
                    .html(body)
                    .show()
                    .fadeOut(2000);
                console.log(type + ": " + body + " Log: " + log);
            } else {
                $error
                    .html(JSON.parse(body.responseText).message)
                    .show()
                    .fadeOut(2000);
                console.log(type + ": " + JSON.parse(body.responseText).message + " Log: " + JSON.parse(body.responseText).errCode);
//            }
            }
        }

        function getUserAndPass() {
            var username = $('#login-name').val();
            var password = $('#login-password').val();
            var userIsValid = ValidationController.isInputCorrect(username);
            var passwordIsValid = ValidationController.isInputCorrect(password);
            if(userIsValid && passwordIsValid) {
                _username = username;
                _password = password;
                _authCode = CryptoJS.SHA1((username+password)).toString();
                return { name: username,
                    pass: password
                }
            } else if (!userIsValid) {
                showMessage("WARNING", "Username is invalid!", "WARNING");
            } else {
                showMessage("WARNING", "Password is invalid!", "WARNING");
            }
        }

        function getUserMessage() {
            var title = $('#user-title').val().trim();
            var message = $('#user-message').val().trim();
            if(title && message) {
                return { title: title,
                    body: message
                }
            } else if(!title) {
                showMessage("WARNING", "Title is missing!", "WARNING");
            } else {
                showMessage("WARNING", "Message is missing!", "WARNING");
            }
        }

        function makeRequest(url, obj) {
            HttpRequester.getJSON(url)
                .then(function (data) {
                    var chatBoxHtml = UI.buildChatBox(data, obj.showLastMessagesCount);
                    $('#chat-box').html(chatBoxHtml);
                });
        }

        return Controller;
    }());

    return Controller;
});