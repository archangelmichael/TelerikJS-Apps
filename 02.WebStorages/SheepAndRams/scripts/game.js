/// <reference path="libs/jquery-2.1.1.min.js" />
define(['jquery'], function ($) {
    var Game = function () {
        var _secretNumber;
        var _score;

        function startGame() {
            _score = 0;
            setSecretNumber();
        }

        function setSecretNumber() {
            var generatedNumber = getFourDigitNumber();
            while(!isValidNumber(generatedNumber)) {
                generatedNumber = getFourDigitNumber();
            }
            _secretNumber = generatedNumber;
        }

        function getSecretNumber() {
            var secret = _secretNumber;
            return secret;
        }

        function getScore() {
            var score = _score;
            return score;
        }

        function checkNumber(input) {
            _score ++;
            if (isValidNumber(input)) {
                return getSheepAndRams(input);
            } else {
                return -1;
            }
        }

        function getSheepAndRams(input) {
            var sheepCount = 0;
            var ramCount = 0;
            if (input === _secretNumber) {
                return {rams: 4};
            } else {
                var inputNumber = input.toString();
                var secretNumber = _secretNumber.toString();
                var j,i;
                for(i = 0 ; i < inputNumber.length; i++) {
                    var digit = inputNumber[i];
                    for (j = 0; j < secretNumber.length; j++) {
                        var currentDigit = secretNumber[j];
                        if (digit === currentDigit && i == j) {
                            ramCount++;
                        }
                        else if(digit === currentDigit) {
                            sheepCount++;
                        }
                    }
                }

                return {
                    rams: ramCount,
                    sheep: sheepCount
                };
            }
        }

        function isValidNumber(number) {
            var isInRange = 1000 <= number && number <= 9999;
            var isNumber = !isNaN(number);
            return (isNumber && isInRange && hasNoRepeatingDigits(number));
        }

        function hasNoRepeatingDigits(number) {
            var numberAsString = number.toString();
            var j,
                i = 0;
            for(i; i < numberAsString.length; i++) {
                var digit = numberAsString[i];
                for (j = i + 1; j < numberAsString.length; j++) {
                    var currentDigit = numberAsString[j];
                    if (digit === currentDigit) {
                        return false;
                    }
                }
            }

            return true;
        }

        function getFourDigitNumber() {
            var min = 1000;
            var max = 9999;
            return Math.floor(Math.random() * (max - min + 1)) + min;;
        }

        return {
            startNewGame : startGame,
            checkNumber : checkNumber,
            getSecretNumber : getSecretNumber,
            getScore: getScore
        }
    };

    return {
        Game : Game
    };
});