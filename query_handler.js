/*
 * This is for the "backend" part of the library. It doesn't have to go on
 * a server, but this should only be used by the library. A user should code
 * against the public API, this module is simply for the public API to call
 */
function Query() {
    "use strict";

    var api_key, httpGetRequest, createMovieObjects, createMovieFromId;

    // Fill in API key for themoviedb.org here!
    api_key = "";

    httpGetRequest = function (url) {
        var request = new XMLHttpRequest();

        request.open("GET", url, false);
        request.send(null);

        return request.responseText;
    };

    createMovieObjects = function (jsonObj) {
        return jsonObj;
    };

    createMovieFromId = function (movieId) {
        var theMovieDBResult, theMovieDBJsonObj, omdbResult, omdbJsonObj, title, year,
            actors, director, movie, imdbId, imdbRating, imdbVotes, i;

        theMovieDBResult = httpGetRequest("https://api.themoviedb.org/3/movie/" + movieId + "?api_key=" + api_key);
        theMovieDBJsonObj = JSON.parse(theMovieDBResult);

        title = theMovieDBJsonObj.title;
        year = theMovieDBJsonObj.release_date.substring(0, 4);
        imdbId = theMovieDBJsonObj.imdb_id;

        omdbResult = httpGetRequest("https://http://www.omdbapi.com/?i=" + imdbId + "&r=json");
        omdbJsonObj = JSON.parse(omdbResult);

        imdbRating = omdbJsonObj.imdbRating;
        imdbVotes = omdbJsonObj.imdbVotes;

        theMovieDBResult = httpGetRequest("https://api.themoviedb.org/3/movie/" + movieId + "/credits?api_key=" + api_key);
        theMovieDBJsonObj = JSON.parse(theMovieDBResult);

        actors = [];
        for (i = 0; i < theMovieDBJsonObj.cast.length; i++) {
            actors[i] = theMovieDBJsonObj.cast[i].name;
        }

        director = "";
        for (i = 0; i < theMovieDBJsonObj.crew.length; i++) {
            if (theMovieDBJsonObj.crew[i].job === "Director") {
                director = theMovieDBJsonObj.crew[i].name;
                break;
            }
        }

        movie = new Movie(title, year, actors, director, imdbRating, imdbVotes, "Movie");
        return movie;
    };

    return {
        queryMovie: function (userQuery) {
            userQuery = userQuery + "?api_key=" + api_key;
            return createMovieObjects(httpGetRequest(userQuery));
        },

        queryActor: function (userQuery) {
            userQuery = userQuery + "?api_key=" + api_key;
        },

        queryShow: function (userQuery) {
            userQuery = userQuery + "?api_key=" + api_key;
        }
    };
}
