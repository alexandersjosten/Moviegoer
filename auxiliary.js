"use strict";

function searchMovie(name, filter) {
    var queryHandler, query, result, filteredResult;

    queryHandler = new Query();
    query = "https://api.themoviedb.org/3/search/movie?query=" + name;
    result = queryHandler.queryMovie(query);

    return result;
}

function searchActor(name, filter) {
    return filter(name);
}

function searchShow(name, filter) {
    return filter(name);
}
