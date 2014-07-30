(function () {
    require.config({
        paths: {
            jquery: "libs/jquery-2.1.1.min",
            handlebars: "libs/handlebars-v1.3.0",
            controller: "students-controller",
            message: "message-system",
            request: "request-controller"
        }
    });

    require(['jquery', 'students-controller'], function ($, controller) {
        $(document).ready(function () {
            var resourceUrl = 'http://localhost:3000/students';

            $('#btn-add-student').on('click', function () {
                controller.addStudent(resourceUrl);
            });

            $('#btn-load-students').on('click', function () {
                controller.loadStudents(resourceUrl);
            });
        });
    })
}());