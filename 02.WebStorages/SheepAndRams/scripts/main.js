/// <reference path="libs/jquery-2.1.1.min.js" />
/// <reference path="libs/require-2.1.14..js" />
/// <reference path="libs/underscore.js" />
/// <reference path="game.js" />
/// <reference path="high-scores.js" />
/// <reference path="guess.js" />
(function () {
    require.config({
        paths: {
            "jquery": "libs/jquery-2.1.1.min" ,
            "underscore":  "libs/underscore"
        }
    });

    require(["jquery", "game", "high-scores", "guess"], function ($, game, scores, guess) {
        var gameInstance = game.Game();
        var checkButton = $('#check-btn');
        var restartButton = $('#restart-btn');
        var submitButton = $('#submit-btn');
        var numberInput = $('#number-container');
        var userInput = $('#name-container');
        var highScores = scores.HighScores();
        var guessTable = guess.Table();

        startGame(gameInstance);

        checkButton.on('click', function () {
            var guess = $('#number').val();
            var result = gameInstance.checkNumber(guess);
            var message = $("#msg");
            var winnerMSG = $("#winner-msg");
            if (result === -1) {
                message.css("color", "red");
                message.text("invalid input");
            } else if(result.rams === 4) {
                message.text();
                winnerMSG.text("GAME WON!");
                winnerMSG.css("color", "blue");
                changeInputVisibility(numberInput, 'hide');
                changeInputVisibility(userInput, 'show');
            } else {
                message.css("color", "green");
                message.text("valid guess");
                console.log("rams: " + result.rams + " sheep: " + result.sheep);
                guessTable.add(guess, result.rams, result.sheep);
            }
        });

        restartButton.on('click', function () {
            startGame(gameInstance);
        });

        submitButton.on('click', function () {
            var playerName = $('#name').val();
            var playerScore = gameInstance.getScore();
            if (playerName !== '') {
                highScores.add(playerName, playerScore);
                changeInputVisibility(userInput, 'hide');
            } else {
                $("#winner-msg").text("No name entered. Please enter your name.");
            }
        });

        function startGame(game) {
            changeInputVisibility(numberInput, 'show');
            changeInputVisibility(userInput, 'hide');
            highScores.load();
            guessTable.clear();
            game.startNewGame();
            console.log(gameInstance.getSecretNumber());
        }

        function changeInputVisibility(input, command) {
            switch (command) {
                case 'hide':
                    input.hide();
                    break;
                case 'show':
                    input.show();
                    break;
                default:
                    console.log(command);
            }
        }
    });
}());