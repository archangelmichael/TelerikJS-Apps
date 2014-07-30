define(['jquery', 'message-logger', 'requests'], function ($, message, request) {
    'use strict';

    function loadMessages(resourceUrl) {
        return request
            .getJSON(resourceUrl)
            .done(message.successMessagesLoaded)
            .fail(message.errorHandler);
    }

    function addMessage(resourceUrl) {
        var data = getMessageData();
        if (data === -1) {
            return;
        }

        console.log(data);
        return request
            .postJSON(resourceUrl, data)
            .done(message.successMessageAdded(data))
            .done(loadMessages(resourceUrl))
            .fail(message.errorHandler);
    }


    function getMessageData() {
        var name = $('#name').val();
        var text = $('#message-text').val();
        if (!name) {
            message.errorMessage("You must have a name!");
            return -1;
        }

        if (!text) {
            message.errorMessage("Empty messages are considered SPAMMING!");
            return -1;
        }

        return {
            'user': name,
            'text': text
        };
    }

    return {
        loadMessages: loadMessages,
        addMessage: addMessage
    }
});