"use strict";

function searchMovie(name, filter) {
    var queryHandler, query;

    queryHandler = new Query();
    query = "https://api.themoviedb.org/3/search/movie?query=" + name;
    queryHandler.queryMovie(query, undefined, filter);
}

function searchActor(name, filter) {
    var queryHandler, query;

    queryHandler = new Query();
    query = "https://api.themoviedb.org/3/search/person?query=" + name;
    console.log(query);
    queryHandler.queryActor(query, filter);
}

function searchShow(name, filter) {
    var queryHandler, query;

    queryHandler = new Query();
    query = "https://api.themoviedb.org/3/search/tv?query=" + name;
    queryHandler.queryShow(query, undefined, filter);
}
