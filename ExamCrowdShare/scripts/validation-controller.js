define(function() {
    var ValidationController = (function() {
        function isUsernameCorrect(username) {
            var isValidUsername = username && typeof username == 'string' &&
                                  username.length >= 4 && username.length <= 40;
            return isValidUsername;
        }

        function isPasswordCorrect(password) {
            var isValidPassword = password && typeof password == 'string' &&
                password.length >= 4 && password.length <= 40;
            return isValidPassword;
        }

        return {
            isUsernameCorrect: isUsernameCorrect,
            isValidPassword: isPasswordCorrect
        }
    }());

    return ValidationController;
});