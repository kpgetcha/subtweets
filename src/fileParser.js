const fs = require('fs');
const Tweet = require('./tweet');

const FileParser = function (filePath, trie, tweetsDb) {
    this.filePath = filePath;
    this.trie = trie;
    this.tweetsDb = tweetsDb;
}

FileParser.prototype.parse = function () {
    fs.readFile(this.filePath, 'utf8', (error, data) => {
        let lines = data.split(' nytimes');
        let newLines = lines[0].split('\n')[2];
        lines = lines.splice(1, lines.length);
        newLines = [newLines, ...lines];
        newLines.forEach(line => {
            let date
            try {
                date = line.match(/\d{4}\-\d{2}\-\d{2}\s+\d{2}:\d{2}:\d{2}/)[0];
            }
            catch (error) {
                console.log(line);
            }
            let words = [];
            let tweets = [];
            let input = line.trim().split(' ');
            for (let i = 2; i < input.length; i++) {
                if (!input[i].startsWith('http') && input[i] !== '' && input[i] !== 'nytimes') {
                    words.push(input[i]);
                    tweets.push(input[i]);
                }
                else if (input[i].startsWith('http')) {
                    tweets.push(input[i]);
                }
            }

            let tweet = new Tweet(date, tweets.join(' '));
            let index = this.tweetsDb.tweets.push(tweet) - 1;
            words.forEach(item => this.trie.addWord(item, index));
        })
    });
}


module.exports = FileParser;