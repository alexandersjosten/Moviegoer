function httpGetRequest(url) {
    var request = new XMLHttpRequest();

    request.open("GET", url, false);
    request.send(null);

    return request.responseText;
}

function createMovieFromId(movieId) {
    var result, jsonObj, title, year, actors, director, movie, i;
    result = httpGetRequest("https://api.themoviedb.org/3/movie/" + movieId + "?api_key=5d019883dbd9dab5244bd5bc9df52cd4");
    jsonObj = JSON.parse(result);

    title = jsonObj.title;
    year = jsonObj.release_date.substring(0, 4);

    result = httpGetRequest("https://api.themoviedb.org/3/movie/" + movieId + "/credits?api_key=5d019883dbd9dab5244bd5bc9df52cd4");
    jsonObj = JSON.parse(result);

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

    movie = new Movie(title, year, actors, director, undefined, undefined, "Movie");
    return movie;
}

function search(name, filter) {
    var result, jsonObj, movie;
    result = httpGetRequest("https://api.themoviedb.org/3/search/person?query=" + name + "&api_key=5d019883dbd9dab5244bd5bc9df52cd4");
    //http://www.omdbapi.com/?t=" + name + "&r=json;
    jsonObj = JSON.parse(result);

    movie = createMovieFromId(jsonObj.results[0].known_for[0].id);
    console.log(movie.toString());
}
