import { connect } from "react-redux"
import { fetchTweets } from "../../actions/tweet_actions"
import Tweets from './tweets';

const mapStateToProps = ({tweets}) => ({
    tweets: Object.values(tweets.all)
})

const mapDispatchToProps = dispatch => ({
    fetchTweets: () => dispatch(fetchTweets())
})

export default connect(mapStateToProps, mapDispatchToProps)(Tweets);