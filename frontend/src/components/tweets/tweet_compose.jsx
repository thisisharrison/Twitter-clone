import React, { Component } from 'react'
import TweetBox from './tweet_box';

export default class TweetCompose extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: '', 
            newTweet: ''
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    // From tweet compose container
    // After new tweet created, it'll be in this.props.newTweet
    componentWillReceiveProps(nextProps) {
        this.setState({ newTweet: nextProps.newTweet });
    }
    update(e) {
        return e => this.setState({ text: e.currentTarget.value });
    }
    handleSubmit(e) {
        e.preventDefault();
        this.props.composeTweet({ text: this.state.text });
        this.setState({text: ''});
    }
    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        New Tweet:
                    </label>
                    <textarea cols="30" rows="10"
                        value={this.state.text}
                        onChange={this.update()}
                    />
                    <input type="submit" value="Post" />
                </form>
                <TweetBox tweet={this.state.newTweet} />
            </div>
        )
    }
}
