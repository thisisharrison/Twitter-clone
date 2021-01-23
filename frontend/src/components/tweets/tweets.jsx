import TweetBox from './tweet_box';

import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';


class Tweets extends Component {
    constructor(props) {
        super(props)
        this.state = {
            tweets: []
        }
    }
    componentWillMount() {
        this.props.fetchTweets();
    }
    componentWillReceiveProps(newState) {
        this.setState({ tweets: newState.tweets });
    }
    // Mongo id are _id
    render() {
        if (this.state.tweets.length === 0) {
            return (
                <div>There are no Tweets</div>
            )
        } else {
            return (
                <div>
                    <h2>All Tweets</h2>
                    {this.state.tweets.map(tweet => <TweetBox key={tweet._id} tweet={tweet}/>)}
                </div>
            )
        }
    }
}

export default withRouter(Tweets);