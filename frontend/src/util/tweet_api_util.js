import axios from 'axios';
// fetch all tweets
export const getTweets = () => {
    return axios.get('api/tweets');
}
// fetch individual tweets
export const getUserTweet = id => {
    return axios.get(`api/tweets/user/${id}`);
}
// write new tweets
export const writeTweet = data => {
    return axios.post('api/tweets', data);
}