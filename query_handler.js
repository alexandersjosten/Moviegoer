/*
 * This is for the "backend" part of the library. It doesn't have to go on
 * a server, but this should only be used by the library. A user should code
 * against the public API, this module is simply for the public API to call
 */
function Query() {
    "use strict";

    var api_key, httpGetRequest;

    // Fill in API key for themoviedb.org here!
    api_key = "";

    httpGetRequest = function (url, callback) {
        var request = new XMLHttpRequest();

        request.open("GET", url);

        request.onload = function (e) {
            if (request.readyState === 4) {
                if (request.status === 200) {
                    callback(JSON.parse(request.responseText));
                } else {
                    console.error(request.statusText);
                }
            }
        };

        request.send(null);
    };

    return {
        queryMovie: function (userQuery, callback) {
            var movies, totalLength;
            movies = [];
            totalLength = 0;

            userQuery = userQuery + "&api_key=" + api_key;

            function createMovieObjects() {
                httpGetRequest(userQuery, createMovie);
            }

            function createMovie(jsonObj) {
                totalLength = jsonObj.results.length;
                jsonObj.results.forEach(function (result) {
                    var id = result.id;
                    httpGetRequest(
                        "https://api.themoviedb.org/3/movie/" + id + "?api_key=" + api_key,
                        function (newJsonObj) {
                            createMovieFromId(newJsonObj, id);
                        }
                    );
                });
            }

            function createMovieFromId(jsonObj, movieId) {
                var title, year, imdbId;

                title = jsonObj.title;
                year = jsonObj.release_date.substring(0, 4);

                imdbId = jsonObj.imdb_id;
                if (imdbId !== "") {
                    httpGetRequest(
                        "http://www.omdbapi.com/?i=" + imdbId + "&r=json",
                        function (omdbJsonObj) {
                            useOMDb(omdbJsonObj, title, year, movieId);
                        }
                    );
                } else {
                    totalLength--;
                }
            }

            function useOMDb(jsonObj, title, year, movieId) {
                //console.log(jsonObj + "      " + title + "      " + year);
                httpGetRequest(
                    "https://api.themoviedb.org/3/movie/" + movieId + "/credits?api_key=" + api_key,
                    function (newJsonObj) {
                        getCastAndCrew(
                            newJsonObj,
                            title,
                            year,
                            jsonObj.imdbRating,
                            jsonObj.imdbVotes
                        );
                    }
                );
            }

            function getCastAndCrew(jsonObj, title, year, imdbRating, imdbVotes) {
                var actors, director, i;
                //console.log(jsonObj + "    " + title + "    " + year + "    " + imdbRating + "    " + imdbVotes);
                //console.log(jsonObj.results.crew);
                actors = [];
                for (i = 0; i < jsonObj.cast.length; i++) {
                    actors[i] = jsonObj.cast[i].name;
                }

                director = "";
                for (i = 0; i < jsonObj.crew.length; i++) {
                    if (jsonObj.crew[i].job === "Director") {
                        director = jsonObj.crew[i].name;
                        break;
                    }
                }

                insertMovie(title, year, actors, director, imdbRating, imdbVotes, "Movie");
            }

            function insertMovie(title, year, actors, director, imdbRating, imdbVotes, type) {
                var movie = new Movie(title, year, actors, director, imdbRating, imdbVotes, type);
                movies.push(movie);

                if (movies.length === totalLength) {
                    callback(movies);
                }
            }

            createMovieObjects();
        },

        queryActor: function (userQuery) {
            userQuery = userQuery + "?api_key=" + api_key;
        },

        queryShow: function (userQuery) {
            userQuery = userQuery + "?api_key=" + api_key;
        }
    };
}

/*
function queryMovie(q, userCallback) {
    function stepOne() {
        sendRequest({
            success: stepTwo
        });
    }
 
    function stepTwo() {
        sendRequest({
            success: stepThree
        });
    }
 
    function stepThree() {
        sendRequest({
            success: userCallback
        });
    }
 
    stepOne();
}
*/
