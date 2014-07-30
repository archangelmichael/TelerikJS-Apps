define(function() {
    var ValidationController = (function() {
        function isInputCorrect(inputString) {
            var isValidInput = inputString && typeof inputString == 'string' &&
                                  inputString.length >= 4 && inputString.length <= 40;
            return isValidInput;
        }

        return {
            isInputCorrect: isInputCorrect
        }
    }());

    return ValidationController;
});