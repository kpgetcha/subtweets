const TrieNode = function (character) {
    this.character = character;
    this.subTweetsRef = [];
    this.children = [];
    this.isCompleteWord = false;
}

const TweetsTrie = function () {
    this.root = new TrieNode('', false);
}

TweetsTrie.prototype.addWord = function (word, index) {
    let node = this.getNode(word);
    if (node === null || node === undefined)
        this._addWord(this.root, word, index);
    else {
        node.subTweetsRef = [...node.subTweetsRef, index];
    }
}

TweetsTrie.prototype._addWord = function (node, word, index) {
    if (word.length === 0) {
        return;
    }

    let initial = node.children.find(item => item.character.toLowerCase() === word[0].toLowerCase());
    if (initial === undefined) {
        let child = new TrieNode(word[0]);
        node.children.push(child);
        if (word.length === 1) {
            child.isCompleteWord = true;
            child.subTweetsRef.push(index);
        }
        this._addWord(child, word.slice(1, word.length), index);
    }
    else {
        this._addWord(initial, word.slice(1, word.length), index);
    }
}

TweetsTrie.prototype.getAllWithPrefix = function (prefix) {
    let node = this.getNode(prefix);
    let list = {
        words: [],
        nodes: []
    };
    if (node === null || node === undefined)
        return null;
    else {
        this._getAllChildren(node, prefix.slice(0, prefix.length - 1), list);
        return list;
    }

}

TweetsTrie.prototype._getAllChildren = function (node, word, list) {
    if (node.isCompleteWord) {
        list.words.push(word + node.character);
    }

    list.nodes.push(node);

    node.children.forEach(item => {
        this._getAllChildren(item, word + node.character, list);
    })
}

TweetsTrie.prototype.getNode = function (word) {
    return this._getNode(this.root, word);
}

TweetsTrie.prototype._getNode = function (node, word) {
    let initial = node.children.find(item => item.character.toLowerCase() === word[0].toLowerCase());
    if (word.length === 1) {
        if (initial !== undefined)
            return initial;
        else
            return null;
    }

    if (initial !== undefined)
        return this._getNode(initial, word.slice(1, word.length));
    else
        return null;
}

TweetsTrie.prototype.print = function () {
    this._print(this.root, '');
}

TweetsTrie.prototype._print = function (node, word) {
    if (node.isCompleteWord) {
        word += node.character;
        console.log(word);
    }
    word += node.character;
    node.children.forEach(item => {
        this._print(item, word);
    })
}

module.exports = TweetsTrie;