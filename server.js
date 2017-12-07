const express = require("express");
const fs = require("fs");
const TweetsTrie = require('./src/trie');
const FileParser = require('./src/fileParser');
const TweetsDb = require('./src/tweetsDb');

const app = express();

let trie = new TweetsTrie();
let tweetsDb = new TweetsDb();
let fileParser = new FileParser('./data/data.txt', trie, tweetsDb);
fileParser.parse();

app.set("port", process.env.PORT || 3001);

// Express only serves static assets in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

app.get("/api/autocomplete/:word", (req, res) => {
  try {
    let suggestion = trie.getAllWithPrefix(req.params.word);
    if (suggestion != null || suggestion != undefined) {
      res.json({ suggestions: suggestion.words.slice(0, 10) });
    }
    else
      res.json({ suggestions: [] });
  }
  catch (error) {
    console.log(error);
    res.status(500).send('Something broke!')
  }

});

app.get("/api/tweets/:word", (req, res) => {
  try {
    let list = trie.getAllWithPrefix(req.params.word);
    if (list != null || list != undefined) {
      let indexes = []
      list.nodes.forEach(item => {
        item.subTweetsRef.forEach(item => {
          indexes = [...indexes, item]
        })
      })
      let tweets = []
      indexes.forEach(item => tweets.push(tweetsDb.tweets[item]));
      tweets = tweets.sort((a, b) => {
        return b.time - a.time;
      })
      res.json({ tweets });
    }
    else
      res.json({ tweets: [] });
  }
  catch (error) {
    console.log(error);
    res.status(500).send('Something broke!')
  }

});

app.listen(app.get("port"), () => {
  console.log(`Find the server at: http://localhost:${app.get("port")}/`); // eslint-disable-line no-console
});
