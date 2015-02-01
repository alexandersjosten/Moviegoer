function TVShow(title, yearStarted, yearEnded, status, seasons, episodes, actors, type) {
    this.title = title;
    this.yearStarted = yearStarted;
    this.yearEnded = yearEnded;
    this.status = status;
    this.seasons = seasons;
    this.episodes = episodes;
    this.actors = actors;
    this.type = type;
}

TVShow.prototype.getTitle = function () {
    return this.title;
};

TVShow.prototype.getYearStarted = function () {
    return this.yearStarted;
};

TVShow.prototype.getYearEnded = function () {
    return this.yearEnded;
};

TVShow.prototype.getStatus = function () {
    return this.status;
};

TVShow.prototype.getSeasons = function () {
    return this.seasons;
};

TVShow.prototype.getEpisodes = function () {
    return this.episodes;
};

TVShow.prototype.getActors = function () {
    return this.actors;
};

TVShow.prototype.getType = function () {
    return this.type;
};

TVShow.prototype.containsActor = function (actor) {
    return this.actors.indexOf(actor) > -1;
};

TVShow.prototype.toString = function () {
    return "Title: " + this.title + "\nYear started: " + this.yearStarted + "\nYear ended: " + this.yearEnded +
        "\nNumber of seasons: " + this.seaons + "\nNumber of episodes: " + this.episodes +
        "\Actors: " + this.actors + "\nType: " + this.type;
};
