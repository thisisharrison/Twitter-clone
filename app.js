// 5. Import Mongoose
const mongoose = require('mongoose');
// 1. Creates our express server
const express = require('express');
const app = express();
// 6. Import DB key 
const db = require('./config/keys').mongoURI;
// 7. Connect MongoDB using Mongoose 
mongoose
    .connect(db, { useNewUrlParser: true })
    .then(() => console.log("Connected to MongoDB successfully"))
    .catch(err => console.log(err));

// 2. Set up a route to render on the page
app.get("/", (req, res) => res.send("Hello World"));

// 3. Define port: Heroku requires process.env.PORT, 
// locally, we'll use 5000
const port = process.env.PORT || 5000;

// 4. Start socket to listen for connections on the path
app.listen(port, () => console.log(`Server is running on port ${port}`));