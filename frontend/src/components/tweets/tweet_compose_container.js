import TweetCompose from './tweet_compose';
import { connect } from "react-redux";
import { composeTweet } from "../../actions/tweet_actions";

const mapStateToProps = store => ({
    newTweet: store.tweets.new,
    currentUser: store.session.user
})

const mapDispatchToProps = dispatch => ({
    composeTweet: (data) => dispatch(composeTweet(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(TweetCompose);