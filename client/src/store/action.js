export const LOAD_TWEETS = "LOAD_TWEETS";

export const loadTweets = (data) => {
    return {
        type: LOAD_TWEETS,
        payload: data,
    }
}
