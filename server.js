var api_key, port, query, httpGetRequest;

// Fill in API key for themoviedb.org here!
api_key = "";

httpGetRequest = function (url) {
    var request = new XMLHttpRequest();

    request.open("GET", url, false);
    request.send(null);

    return request.responseText;
};

query = function (query) {
    var result;

    result = httpGetRequest(query + "?api_key=" + api_key);

    return JSON.parse(result);
};
