import { writeTweet, getTweets, getUserTweet } from "../util/tweet_api_util";

export const RECEIVE_TWEETS = 'RECEIVE_TWEETS';
export const RECEIVE_USER_TWEETS = 'RECEIVE_USER_TWEETS';
export const RECEIVE_NEW_TWEET = 'RECEIVE_NEW_TWEET';

export const receiveTweets = tweets => ({
    type: RECEIVE_TWEETS,
    tweets
})

export const receiveUserTweet = tweets => ({
    type: RECEIVE_USER_TWEETS,
    tweets
})

export const receiveNewTweet = tweet => ({
    type: RECEIVE_NEW_TWEET,
    tweet
})

export const fetchTweets = () => dispatch => (
    getTweets().then(tweets => dispatch(receiveTweets(tweets)))
    .catch(err => console.log(err))
)

export const fetchUserTweets = id => dispatch => (
    getUserTweet(id).then(tweets => dispatch(receiveUserTweet(tweets)))
    .catch(err => console.log(err))
)

export const composeTweet = data => dispatch => (
    writeTweet(data).then(tweet => dispatch(receiveNewTweet(tweet)))
    .catch(err => console.log(err))
)