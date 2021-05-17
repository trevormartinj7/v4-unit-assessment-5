require('dotenv').config();
const express = require('express'),
      userCtrl = require('./controllers/user'),
      postCtrl = require('./controllers/posts')
const massive = require('massive')
const session = require('express-session')


let { SERVER_PORT, CONNECTION_STRING, SESSION_SECRET } = process.env;

const app = express();

//Top level middleware
app.use(express.json());
app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {maxAge: 1000 * 60 * 60 * 24}
}))







//Connecting to server with massive:
console.log(SERVER_PORT);
console.log(CONNECTION_STRING);

massive({
    connectionString: CONNECTION_STRING,
    ssl: {rejectUnauthorized: false}
}).then(db => {
    app.set('db', db);
    console.log("Database connection complete")
    //Now we let the server listen for more commands
    app.listen(SERVER_PORT, () => console.log("I'm listening for commands at port " + SERVER_PORT))
}).catch((err) => console.log(err));





// //Auth Endpoints
app.post('/api/auth/register', userCtrl.register);
app.post('/api/auth/login', userCtrl.login);
app.get('/api/auth/me', userCtrl.getUser);
app.post('/api/auth/logout', userCtrl.logout);

// //Post Endpoints
app.get('/api/posts', postCtrl.readPosts);
app.post('/api/post', postCtrl.createPost);
app.get('/api/post/:id', postCtrl.readPost);
app.delete('/api/post/:id', postCtrl.deletePost)

// app.listen(4000, _ => console.log(`running on ${4000}`));