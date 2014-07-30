(function () {
    require.config({
        paths: {
            jquery: "libs/jquery-2.1.1.min",
            sammy: "libs/sammy-0.7.5.min"
        }
    });

    require(['jquery', 'sammy'], function ($, sammy) {
        var app = sammy('#container', function () {
            this.get('#/', function () {
                alert("welcome");
            });
            this.get('#/home', function () {
                alert("home");
            });
            this.get('#/about', function () {
                alert("about");
            });
            this.get('#/student', function (id) {
                alert('student');
            }) ;
            this.get('#/student/:id', function (id) {
                alert('student ' + this.params['id']);
            }) ;
        });

        app.run('#/student');
    })
}());