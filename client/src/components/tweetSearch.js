import React, { Component } from 'react';
import Autosuggest from 'react-autosuggest';
import { connect } from 'react-redux';
import { loadTweets } from '../store/action';

const getSuggestions = value => {
    return fetch(`api/autocomplete/${value}`)
        .then(data => data.json())
        .then(data => {
            return data.suggestions;
        })
        .catch(error => console.log(error));
};

const getSuggestionValue = suggestion => suggestion;

const renderSuggestion = suggestion => (
    <span>{suggestion}</span>
);

class TweetSearch extends Component {

    constructor(props) {
        super(props);
        this.onTweetSearch = this.onTweetSearch.bind(this);
        this.state = {
            value: '',
            suggestions: [],
            tweets: []
        };
    }

    onChange = (event, { newValue }) => {
        this.setState({
            value: newValue
        });
    };

    onSuggestionsFetchRequested = ({ value }) => {
        getSuggestions(value)
            .then(data => {
                this.setState({
                    suggestions: data
                });
            })
    };

    onSuggestionsClearRequested = () => {
        this.setState({
            suggestions: []
        });
    };

    onTweetSearch() {
        let { loadTweets } = this.props;

        fetch(`api/tweets/${this.state.value}`)
            .then(data => data.json())
            .then(data => {
                loadTweets(data.tweets)
            })
            .catch(error => console.log(error));
    }

render() {
    const { value, suggestions } = this.state;
    
    const inputProps = {
      placeholder: 'Search tweets',
      value,
      onChange: this.onChange
    };

    return (
        <div className="row searchBar">
          <div className="col-md-8 col-xs-8">
            < Autosuggest
              suggestions={suggestions}
              onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
              onSuggestionsClearRequested={this.onSuggestionsClearRequested}
              getSuggestionValue={getSuggestionValue}
              renderSuggestion={renderSuggestion}
              inputProps={inputProps}
            />
          </div>
          <div className="col-md-4 col-xs-4">
            <button className="btn btn-primary" onClick={this.onTweetSearch} type="button">
              Search Tweets
            </button>
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

export default connect(mapStateToProps, mapDispatchToProps)(TweetSearch);
