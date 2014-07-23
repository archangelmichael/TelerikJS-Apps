(function () {
    var input = document.getElementById("input");
    var div = document.createElement('div');

    function appendInfo(output, collection) {
        _.chain(collection)
            .each(function (student) {
                var currentStudent = div.cloneNode(true);
                currentStudent.innerHTML = student.firstName + " " + student.lastName + " at the age of " + student.age + " has grades: " + student.marks;
                output.appendChild(currentStudent);
            });
    }

    //show input data
    appendInfo(input, students);

    //set fullName for all students
    students = _.map(students, function (student) {
        student.fullName = student.firstName + " " + student.lastName;
        return student;
    });

    var studentsWithFirstNameBeforeLastName = _.chain(students)
        .filter(function (student) {
            return student.firstName.toLowerCase() < student.lastName.toLowerCase();
        })
        .sortBy("fullName")
        .value();

    console.log('TASK 1 RESULT! Students with first name alphabetically before last name sorted in descending order by full name');
    console.log(studentsWithFirstNameBeforeLastName);

    var studentsAtAgeBetween18And24 = _.chain(students)
        .filter(function (student) {
            return 18 <= student.age && student.age <= 24;
        })
        .map(function getNames(student) {
            return {firstName: student.firstName, lastName:student.lastName};
        })
        .value();


    console.log('TASK 2 RESULT! Names of students with age between 18 and 24 including');
    console.log(studentsAtAgeBetween18And24);

    var bestStudent = _.chain(students)
        .max(function (student) {
            var score = 0;

            _.each(student.marks, function (mark) {
                score += mark;
            });

            return score / student.marks.length;
        })
        .value();

    console.log('TASK 3 RESULT! Student with highest marks');
    console.log(bestStudent);

    var mostCommonFirstName = _.chain(students)
        .groupBy("firstName")
        .max(function (student) {
            return student.length;
        })
        .value()[0].firstName;

    var mostCommonLastName = _.chain(students)
        .groupBy("lastName")
        .max(function (student) {
            return student.length;
        })
        .value()[0].lastName;

    console.log('TASK 7 RESULT! Most common first and last name');
    console.log(mostCommonFirstName);
    console.log(mostCommonLastName);
}());