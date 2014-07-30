define(['jquery', 'Q'], function($, Q) {
    var HttpRequester = (function() {
        var makeHttpRequest = function(url, type, data, headers) {
            var deferred = Q.defer();
            $.ajax({
                url: url,
                type: type,
                headers: headers,
                dataType: "json",
                data: data ? JSON.stringify(data) : "",
                contentType: "application/json",
                timeout: 5000,
                success: function(resultData) {
                    deferred.resolve(resultData);
                },
                error: function(errorData) {
                    deferred.reject(errorData);
                }
            });

            return deferred.promise;
        };

        var getJSON = function(url) {
            return makeHttpRequest(url, "GET");
        };

        var registerUser = function (url, data) {
            return makeHttpRequest(url, "POST", data);
        };

        var loginUser = function (url, data) {
            return makeHttpRequest(url, "POST", data);
        };

        var logoutUser = function (url, data, headers) {
            return makeHttpRequest(url, "PUT", data, headers);
        };

        var sendPost = function (url, data, headers) {
            return makeHttpRequest(url, "POST", data, headers);
        };

        return {
            getJSON: getJSON,
            registerUser: registerUser,
            logoutUser: logoutUser,
            loginUser: loginUser,
            sendPost: sendPost
        }
    }());

    return HttpRequester;
});