define(function() {
    require.config({
        paths: {
            'jquery': 'libs/jquery-2.1.1',
            'sammy': 'libs/sammy',
            'mustache': 'libs/mustache-0.8.1.min',
            'underscore':'libs/underscore-1.6.0.min',
            'crypto': 'libs/2.3.0-crypto-sha1',
            'http-requester': 'http-requester',
            'validation-controller': 'validation-controller',
            'ui': 'ui-controller',
            'controller': 'controller',
            'Q': 'libs/q.min'
        }
    });

    require(['jquery', 'sammy', 'controller', 'ui'], function($, Sammy, Controller) {
        var appController = new Controller('http://localhost:3000'); //'http://jsapps.bgcoder.com'
        appController.setEventHandler();
        appController.loadChatBox();

        var app = Sammy('#wrapper', function() {
            this.get("#/login", function() {
                if (appController.isLoggedIn()) {
                    window.location = '#/chat';
                    return;
                }

                appController.loadLoginForm();
            });

            this.get("#/chat", function() {
                if (!appController.isLoggedIn()) {
                    window.location = '#/login';
                    return;
                }

                appController.loadChat();
            });
        });

        app.run('#/login');
    });
});