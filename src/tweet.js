const Tweet = function (dateTime, tweet) {
  this.time = new Date(dateTime);
  this.tweet = tweet;
}

module.exports = Tweet;