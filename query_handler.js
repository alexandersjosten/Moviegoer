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

        queryShow: function (userQuery, callback) {
            var shows, totalLength;

            shows = [];
            userQuery = userQuery + "&api_key=" + api_key;

            function getTVShows() {
                httpGetRequest(userQuery, createTVShow);
            }

            function createTVShow(jsonObj) {
                totalLength = jsonObj.results.length;
                
                jsonObj.results.forEach(function (result) {
                    var id = result.id;

                    httpGetRequest(
                        "https://api.themoviedb.org/3/tv/" + id + "?api_key=" + api_key,
                        function(newJsonObj) {
                            createTVShowFromId(newJsonObj, id);
                        }
                    ); 
                });
            }

            function createTVShowFromId(jsonObj, showId) {
                var title, startYear, endYear, seasons, episodes, type;

                title = jsonObj.name;
                if(jsonObj.first_air_date) {
                    startYear = jsonObj.first_air_date.substring(0, 4);
                }

                if(jsonObj.last_air_date) {
                    endYear = jsonObj.last_air_date.substring(0, 4);
                }
                
                status = jsonObj.status;
                seasons = jsonObj.number_of_seasons;
                episodes = jsonObj.number_of_episodes;
                type = "TV Show";

                httpGetRequest(
                    "https://api.themoviedb.org/3/tv/" + showId + "/credits?api_key=" + api_key,
                    function(newJsonObj) {
                        getCastAndCrew(newJsonObj, title, startYear, endYear, status, seasons, episodes, type);
                    }
                );
            }

            function getCastAndCrew(jsonObj, title, startYear, endYear, status, seasons, episodes, type) {
                var actors, i;
                
                actors = [];
                for (i = 0; i < jsonObj.cast.length; i++) {
                    actors[i] = jsonObj.cast[i].name;
                }

                insertShow(title, startYear, endYear, status, seasons, episodes, actors, type);
            }

            function insertShow(title, startYear, endYear, status, seasons, episodes, actors, type) {
                var tvShow = new TVShow(title, startYear, endYear, status, seasons, episodes, actors, type);
                shows.push(tvShow);
                console.log(shows);
                if(shows.length === totalLength) {
                    callback(shows);
                }
            }

            getTVShows();
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
