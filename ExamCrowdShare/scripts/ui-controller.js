define(['mustache','jquery','underscore'], function(mustache, $, _) {
    var UI = (function() {
        var _messages = [];
        var _data;
        var chat = $('#chat-box');

        function buildMessage(postBy, postText) {
            var template = $("#mustache-template").html();
            var output = Mustache.render(template, { 'user': postBy, 'message': postText });
            return output;
        }

        function buildChatBox(data, skipMessagesCount) {
            _data = data;
            createMessagesData(data, skipMessagesCount);
            appendMessagesToChat();
        }

        function appendMessagesToChat() {
            chat.html('');
            for (var i=0; i<_messages.length; i++) {
                user = _messages[i].user;
                message = _messages[i].message;
                var post = buildMessage(user, message);
                chat.append(post);
            }
        }

        function createMessagesData(data, skipMessagesCount) {
            var posts = [];
            for (var key in data) {
                if (data.hasOwnProperty(key)) {
                    var obj = data[key];
                    posts.push({
                        user:obj.user.username,
                        message:obj.body,
                        date: obj.postDate,
                        title: obj.title
                    });
                }
            }

            _messages = posts || [];
        }

        function sortMessages() {
            var sortingMethods = ['date', 'user' , 'title', 'message'];
            var method = $('#sort-method').val();
            var order = $("#sort-order").is(":checked");
            var orderedMessages = [];
            console.log(method);

            if($.inArray(method, sortingMethods) !== -1) {
                orderedMessages = _.chain(_messages)
                    .sortBy(method)
                    .value();
            } else {
                return;
            }

            if (order) {
                orderedMessages = orderedMessages.reverse();
            }

            _messages = orderedMessages;
            appendMessagesToChat(_messages);
        }

        function filterMessages() {
            var user = $('#user').val();
            var pattern = $('#pattern').val().replace(/ /g, '%20');
            var isPatternFilter = $("#pattern-filter").is(":checked");
            var isUserFilter = $("#user-filter").is(":checked");
            var filter = '';

            if(isPatternFilter && isUserFilter && pattern && user) {
                filter = '?pattern='+ pattern + '&user=' + user;
            } else if (isPatternFilter && !isUserFilter && pattern) {
                filter = '?pattern='+ pattern;
            } else if(isUserFilter && user) {
                filter = '?user=' + user;
            } else {
                return '';
            }

            return filter;
        }

        function getData() {
            var data = _data;
            //console.log("refreshed");
            return data;
        }

        return {
            buildMessage: buildMessage,
            buildChatBox: buildChatBox,
            sortMessages: sortMessages,
            filterMessages: filterMessages,
            getData: getData,
            appendMessages: appendMessagesToChat
        }
    }());

    return UI;
});