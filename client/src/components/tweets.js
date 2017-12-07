import React, { Component } from 'react';
import reactStringReplace from 'react-string-replace';
import { connect } from 'react-redux';
import { loadTweets } from '../store/action';

class TweetList extends Component {

    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(event) {
        let { loadTweets } = this.props;
        fetch(`api/tweets/${event.target.text}`)
            .then(data => data.json())
            .then(data => {
                console.log(data);
                loadTweets(data.tweets)
            })
        console.log(event.target.text);
    }

    render() {

        const parse = tweet => {
            let replacedText;

            // Match URLs
            replacedText = reactStringReplace(tweet, /(http?:\/\/\S+)/g, (match, i) => (
                <a key={match + i} target="_blank" href={match}>{match}</a>
            ));

            // Match URLs
            replacedText = reactStringReplace(tweet, /(https?:\/\/\S+)/g, (match, i) => (
                <a key={match + i} target="_blank" href={match}>{match}</a>
            ));

            // Match @-mentions
            replacedText = reactStringReplace(replacedText, /@(\w+)/g, (match, i) => (
                <a key={match + i} href='javascript: void(0)' onClick={this.handleClick}>@{match}</a>
            ));

            // Match hashtags
            replacedText = reactStringReplace(replacedText, /#(\w+)/g, (match, i) => (
                <a key={match + i} href='javascript: void(0)' onClick={this.handleClick}>#{match}</a>
            ));

            return replacedText;
        }

        let { tweets } = this.props;

        const tweetList = tweets.map((tweet, index) => {
            return <div className="panel panel-default" key={index}>
                <div className="panel-body">
                    <div className="tweetDate" style={{ float: 'left' }}>
                        {new Date(tweet.time).toDateString("en-US")}
                    </div>
                    <div className="tweet">
                        {parse(tweet.tweet)}
                    </div>
                </div>
            </div>
        });

        return (
            <div>
                {tweetList}
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return ({
        loadTweets: (data) => {
            dispatch(loadTweets(data))
        }
    })
}

const mapStateToProps = state => {
    return {
        tweets: state.tweets,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TweetList);
