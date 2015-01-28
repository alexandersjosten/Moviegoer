function Movie(title, year, actors, director, imdbRating, imdbVotes, type) {
    this.title = title;
    this.year = year;
    this.actors = actors;
    this.director = director;
    this.imdbRating = imdbRating;
    this.imdbVotes = imdbVotes;
    this.type = type;
}

Movie.prototype.getTitle = function () {
    return this.title;
};

Movie.prototype.getYear = function () {
    return this.year;
};

Movie.prototype.getActors = function () {
    return this.actors;
};

Movie.prototype.getDirector = function () {
    return this.director;
};

Movie.prototype.getImdbRating = function () {
    return this.imdbRating;
};

Movie.prototype.getImdbVotes = function () {
    return this.imdbVotes;
};

Movie.prototype.getType = function () {
    return this.type;
};

Movie.prototype.containsActor = function (actor) {
    return this.actors.indexOf(actor) > -1;
};

Movie.prototype.toString = function () {
    return "Title: " + this.title + "\nYear: " + this.year + "\nActors: " + this.actors +
        "\nDirector: " + this.director + "\nIMDbRating: " + this.imdbRating +
        "\nIMDbVotes: " + this.imdbVotes + "\nType: " + this.type;
};
