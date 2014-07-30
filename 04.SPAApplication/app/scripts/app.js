(function () {
    require.config({
        paths: {
            jquery: 'libs/jquery-2.1.1.min',
            sammy: 'libs/sammy-0.7.5.min',
            handlebar: 'libs/handlebars-v1.3.0'
        }
    });

    require(['jquery','sammy','messages-controller'], function ($, sammy, messages) {
        var resourceUrl =  'http://crowd-chat.herokuapp.com/posts';
        var container = $('#container');
        $(document).on('click', '#send-message-btn', function(){
            messages.addMessage(resourceUrl);
        });

        var app = sammy('#container', function () {
            this.get('#/home', function () {
                container.load('home.html');
            });
            this.get('#/messages', function () {
                container.load('messages.html');
                messages.loadMessages(resourceUrl);
            });
        });

        app.run('#/home');
    });
}());
