import React from 'react'

export default function TweetBox({tweet: {text, date, user}}) {
    return (
        <div>
            <h5>{text}</h5>
            <small>{date}</small>
            <small>{user}</small>
        </div>
    )
}