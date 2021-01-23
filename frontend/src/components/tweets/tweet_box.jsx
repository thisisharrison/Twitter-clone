import React from 'react'

export default function TweetBox({tweet, currentUser}) {
    if (tweet === '') {
        return (
            <div>Tweet your heart out</div>
        )
    } else {
        const { text, date, user } = tweet;
        return (
            <div>
                <h5>{text} - <small>@{user.handle || currentUser.handle}</small></h5>
                <small>{date}</small>
            </div>
        )
    }
}