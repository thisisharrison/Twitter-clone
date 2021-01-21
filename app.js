// 5. Import Mongoose
const mongoose = require('mongoose');
// 1. Creates our express server
const express = require('express');
const app = express();
// 6. Import DB key 
const db = require('./config/keys').mongoURI;
// A. Define Users and Tweets routes
const users = require("./routes/api/users");
const tweets = require("./routes/api/tweets");
// C. Body Parser so we can parse JSON we send to frontend
const bodyParser = require("body-parser");
// E. User model
const User = require('./models/User');

// 7. Connect MongoDB using Mongoose 
mongoose
    .connect(db, { useNewUrlParser: true })
    .then(() => console.log("Connected to MongoDB successfully"))
    .catch(err => console.log(err));

// 2. Set up a route to render on the page
app.get("/", (req, res) => {
    const demo = new User ({
        handle: "demo", 
        email: "demo@email.com",
        password: "password123"
    })
    demo.save()
    res.send("Hello World")
});

// D. Set up Middleware for body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// B.
app.use("/api/users", users);
app.use("/api/tweets", tweets);

// 3. Define port: Heroku requires process.env.PORT, 
// locally, we'll use 5000
const port = process.env.PORT || 5000;

// 4. Start socket to listen for connections on the path
app.listen(port, () => console.log(`Server is running on port ${port}`));