/// <reference path="libs/jquery-2.1.1.min.js" />
define(['jquery'], function ($) {
    var Table = function () {
        var table = $('#answers-storage');
        var $ram = $("<img src='images/ram.png'/>").css('width', '40px');
        var $sheep = $("<img src='images/sheep.png'/>").css('width', '40px');
        function addGuess(guess, rams, sheep) {
            var i;
            var result = $('<p>').html(guess);

            for (i = 0; i < sheep; i++) {
                result.append($sheep.clone(true));
            }

            for (i = 0; i < rams; i++) {
                result.append($ram.clone(true));
            }

            table.append(result);
        }

        function clearTable() {
            table.html('');
        }

        return {
            add : addGuess,
            clear : clearTable
        }
    };

    return {
        Table : Table
    };
});
