define(['jquery', 'message-system', 'request-controller'], function ($, message, request) {
    'use strict';

    function loadStudents(resourceUrl) {
        return request
            .getJSON(resourceUrl)
            .done(message.successLoadStudents)
            .fail(message.errorHandler);
    }

    function addStudent(resourceUrl) {
        var data = getStudentData();
        if (data === -1) {
            return;
        }

        console.log(data);
        return request
            .postJSON(resourceUrl, data)
            .done(message.successAddStudent(data))
            .done(loadStudents(resourceUrl))
            .fail(message.errorHandler);
    }

    function removeStudent(resourceUrl) {
        var id = getStudentId();
        if (id === -1) {
            return;
        }

        console.log(id);
        return request
            .deleteJSON(resourceUrl, id)
            .done(message.successRemoveStudent(id))
            .done(loadStudents(resourceUrl))
            .fail(message.errorHandler);
    }

    function getStudentData() {
        var name = $('#name').val();
        var grade = $('#grade').val();
        console.log(grade);
        if (!name) {
            message.errorMessage("Student must have a name!");
            return -1;
        }

        if (isNaN(grade) || (1 > grade || grade > 12)) {
            message.errorMessage("Grade should be between 1 and 12!");
            return -1;
        }

        return {
            name: name,
            grade: grade
        };
    }

    function getStudentId() {
        var id = $('#id').val();
        console.log(id);
        if (isNaN(id) || id < 0) {
            message.errorMessage("ID should be bigger than 0!");
            return -1;
        }

        return id;
    }

    return {
        loadStudents: loadStudents,
        addStudent: addStudent,
        removeStudent: removeStudent
    }

});