/// <reference path="libs/jquery-2.1.1.min.js" />
/// <reference path="libs/underscore.js" />
define(['jquery', 'underscore'], function ($, _) {
    var HighScores = function () {
        function addNewHighScore(name, score) {
            localStorage.setItem(name,score);
            loadAllHighScores();
        }

        function loadAllHighScores() {
            var scoresTable = $('#scores');
            var highScores = [],
                list = [];

            scoresTable.html('');

            for (var i = 0; i < localStorage.length; i++) {
                var nickname = localStorage.key(i),
                    score = localStorage.getItem(nickname);

                highScores.push([nickname, score]);
            }

            highScores.sort(function (a, b) {
                a = parseInt(a[1]);
                b = parseInt(b[1]);

                return a < b ? -1 : (a > b ? 1 : 0);
            });

            var count = 1;
            for (var player in highScores) {
                list.push(count + '. ' + highScores[player][0] + ' - ' + highScores[player][1] + ' tries.');
                count++;
            }

            scoresTable.html(list.join('<br/>'));
        }

        return {
            add : addNewHighScore,
            load : loadAllHighScores
        }
    };

    return {
        HighScores : HighScores
    };
});