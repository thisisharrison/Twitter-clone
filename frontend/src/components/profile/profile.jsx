import TweetBox from '../tweets/tweet_box';
import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';

class Profile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            tweets: []
        }
    }
    componentWillMount() {
        this.props.fetchUserTweets(this.props.currentUser.id);
    }
    componentWillReceiveProps(newState) {
        this.setState({ tweets: newState.tweets });
    }
    render() {
        if (this.state.tweets.length === 0) {
            return (
                <div>This user has no tweet</div>
            )
        } else {
            return (
                <div>
                    <h2>All of {this.props.currentUser.handle}'s Tweets</h2>
                    {this.state.tweets.map(tweet => <TweetBox key={tweet._id} tweet={tweet} />)}
                </div>
            )
        }
    }
}

export default withRouter(Profile);