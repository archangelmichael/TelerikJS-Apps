(function () {
    var input = document.getElementById("input");
    var div = document.createElement('div');
    //show input data
    appendInfo(input, books);

    var mostPopularAuthor = _.chain(books)
        .groupBy("author")
        .max(function (author) {
            return author.length;
        })
        .value()[0].author;

    console.log("The most popular author is:");
    console.log(mostPopularAuthor);

    function appendInfo(output, collection) {
        _.chain(collection)
            .each(function (book) {
                var currentBook = div.cloneNode(true);
                currentBook.innerHTML = "HEADING: " + book.title + "; AUTHOR: " + book.author ;
                output.appendChild(currentBook);
            });
    }
}());