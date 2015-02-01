# Moviegoer
API for making movie queries easier.
It uses themoviedb.org as the target for the queries.
An API key must be obtained by the user of the API.

How to use:
Simply add the files and add your own API key in query_handler.js

Example of filter is e.g.
searchActor("Brad Pitt", function (results) {
    movies.forEach(function (result) {
        if(movie.containsActor("Johnny Depp")) {
            printSomewhere(movie.toString());
        }
    });
});
