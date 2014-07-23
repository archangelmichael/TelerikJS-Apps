(function () {
    var input = document.getElementById("input");
    var div = document.createElement('div');
    var legsCount = 0;

    //show input data
    appendInfo(input, animals);

    var animalsGroupedBySpeciesAndSortedByLegs = _.chain(animals)
        .groupBy("species")
        .map(function (group) {
            return _.sortBy(group, 'legs');
        })
        .value();

    console.log("TASK 4 RESULT! Animals grouped by species and sorted by legs count");
    console.log(animalsGroupedBySpeciesAndSortedByLegs);

    _.chain(animals)
        .each(function (animal) {
            legsCount += animal.legs;
        });

    console.log("TASK 5 RESULT! Total number of animal legs");
    console.log(legsCount);

    function appendInfo(output, collection) {
        _.chain(collection)
            .each(function (animal) {
                var currentStudent = div.cloneNode(true);
                currentStudent.innerHTML = animal.name + " is a " + animal.species + " and has " + animal.legs + " legs!";
                output.appendChild(currentStudent);
            });
    }
}());