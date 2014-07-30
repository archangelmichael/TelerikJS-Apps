define(['jquery', 'handlebar'], function ($, handlebars) {
    'use strict';

    var $successMsg = $('.messages .success');
    var $errorMsg = $('.messages .error');
    var source = $('#message-template').html();
    var template = Handlebars.compile(source);

    function messageAdded(data) {
        console.log('User : ' + data.user +  ' successfully added a message!');
        $successMsg.html('' + data.user + ' successfully added a message!')
            .show()
            .fadeOut(2000);
    }

    function messagesLoaded(data) {
        console.log('All messages successfully loaded.');
        var messages = data;
        console.log(messages);
        var $messagesList = template({messages : messages});
        $('#messages-container').html($messagesList);
    }

    function errorHandler(err) {
        console.log('Error: ' + JSON.stringify(err));
        $errorMsg
            .html('Error: ' + err.status + ' (' + err.statusText + ')')
            .show()
            .fadeOut(2000);
    }

    function errorMessage(text) {
        console.log('Error: ' + text);
        $errorMsg
            .html('Error: ' + text)
            .show()
            .fadeOut(2000);
    }

    return {
        successMessageAdded: messageAdded,
        successMessagesLoaded: messagesLoaded,
        errorMessage: errorMessage,
        errorHandler: errorHandler
    }
});
