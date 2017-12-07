import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { connect } from 'react-redux';
import Autosuggest from 'react-autosuggest';
import TweetList from './components/tweets';
import TweetSearch from './components/tweetSearch';
import { loadTweets } from './store/action';


class App extends Component {


  render() {
    let { tweets } = this.props;

    return (
      <div className="container">
        <TweetSearch />
        <div className="tweetContainer">
          <TweetList tweets={tweets} />
        </div>
      </div>
    );
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

export default connect(mapStateToProps, mapDispatchToProps)(App);
