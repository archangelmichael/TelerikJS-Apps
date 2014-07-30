define(['jquery', 'handlebars'], function ($, handlebars) {
    'use strict';

    var $successMsg = $('.messages .success');
    var $errorMsg = $('.messages .error');
    var source = $('#student-template').html();
    var template = Handlebars.compile(source);

    function studentAdded(data) {
        console.log('Student : ' + data.name +  ' successfully added!');
        $successMsg.html('' + data.name + ' successfully added')
            .show()
            .fadeOut(2000);
    }

    function studentsLoaded(data) {
        console.log('All students successfully loaded.');
        var studentsList = data.students;
        console.log(studentsList);
        var $studentsList = template({students : studentsList});

        $('#students-container').html($studentsList);
    }

    function errorHandler(err) {
        console.log('Error: ' + JSON.stringify(err));
        $errorMsg
            .html('Error: ' + err.status + ' (' + err.statusText + ')')
            .show()
            .fadeOut(2000);
    }

    function invalidInput(message) {
        $errorMsg
            .html('Error: ' + message)
            .show()
            .fadeOut(4000);
    }

    return {
        successAddStudent: studentAdded,
        successLoadStudents: studentsLoaded,
        errorHandler: errorHandler,
        inputError: invalidInput
    }
});
