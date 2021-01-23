import React, { Component } from 'react'
import { Link } from 'react-router-dom';

export default class NavBar extends Component {
    constructor(props) {
        super(props);
        this.getLinks = this.getLinks.bind(this);
        this.logoutUser = this.logoutUser.bind(this);
    }
    logoutUser(e) {
        e.preventDefault();
        this.props.logout();
    }
    getLinks() {
        if (this.props.loggedIn) {
            return (
                <div>
                    <Link to={"/tweets"}>All Tweets</Link>
                    <Link to={"/profile"}>My Profile</Link>
                    <Link to={"/new-tweet"}>New Tweet</Link>
                    <button onClick={this.logoutUser}>Logout</button>
                </div>
            );
        } else {
            return (
                <div>
                    <Link to={"/signup"}>Sign Up</Link>
                    <Link to={"/login"}>Log In</Link>
                </div>
            )
        }
    }
    render() {
        return (
            <div>
                <h1>Chirper</h1>
                {this.getLinks()}
            </div>
        )
    }
}
