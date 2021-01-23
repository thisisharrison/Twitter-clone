import Profile from './profile';
import { connect } from "react-redux";
import { fetchUserTweets } from "../../actions/tweet_actions";

const mapStateToProps = store => ({
    tweets: Object.values(store.tweets.user), 
    currentUser: store.session.user
})

const mapDispatchToProps = dispatch => ({
    fetchUserTweets: (id) => dispatch(fetchUserTweets(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(Profile);