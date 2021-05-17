const bcrypt = require('bcryptjs')

module.exports = {
    register: async (req, res) => {
        //This connects with the database, checks to see if the stuff already exists, then returns an error early if it does
        const db = req.app.get('db');
        const {username, password} = req.body;
        
        const [checkUser] = await db.user.find_user_by_username(username);
        console.log("TEST STRING")
        if(checkUser){
            return res.status(409).send("username already registered");
        }
        //This only happens if the email wasn't found
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);
        const [user] = await db.user.create_user([username, hash, `https://robohash.org/${username}.png`]);
        delete user.password;
        
        req.session.user = user;
        console.log(req.session.user)
        return res.status(200).send(req.session.user);
    },
    login: async (req, res) => {
        const db = req.app.get('db');
        const {username, password} = req.body;
        
        //When we do a sql call, it returns an array. Putting our variable in brackets like this 
        //tells it we just want the first (and only in this case) result
        const [user] = await db.user.find_user_by_username(username);
        console.log("login was called")
        if(!user){
            console.log("Rip user not found")
            //So if the username isn't in our database, it will return an error and the string
            return res.status(402).send("username not found")
        }
        //Now we use bcrypt to compare the database password vs the user-provided password
        const result = bcrypt.compareSync(password, user.password);
        console.log(result);
        if(result){
            //Result will only be true if the password matches. In that case, we return the user to the user session
            console.log("User found, logged in")
            console.log(user)
            delete user.password;
            req.session.user = user;
            return res.status(200).send(req.session.user);
        }
        return res.status(403).send("Email or password was incorrect")
    },
    getUser: async (req, res) => {
        if(!req.session.user){
            
            return res.status(401).send("user not found")
        }
        return res.status(200).send(req.session.user)
    },
    logout: async (req, res) => {
        req.session.destroy();
        return res.sendStatus(200);
    }

}