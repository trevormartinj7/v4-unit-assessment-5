const bcrypt = require('bcryptjs')

module.exports = {
    register: async (req, res) => {
        try {
            const db = req.app.get('db')
            const { username, password } = req.body
    
            let users = await db.user.find_user_by_username(username)
            let user = users[0]
    
            if (user) {
                return res.status(409).send('username already exists')
            }
    
            const salt = bcrypt.genSaltSync(10)
            const hash = bcrypt.hashSync(password, salt)
    
            let response = await db.user.create_user({ username, hash, profile: `https://robohash.org/${username}.png` })
            let newUser = response[0]
    
            delete newUser.password
    
            req.session.user = newUser
            res.send(req.session.user)
            
        } catch (error) {
            console.log('error', error)
            res.status(500).send(error)
        }
    },
    login: async (req, res) => {
        try {
            const db = req.app.get('db')
            let { username, password } = req.body
    
            let users = await db.user.find_user_by_username(username)
            let user = users[0]
    
            if (!user) {
                return res.status(401).send('username or password incorrect')
            }

            let isAuthenticated = bcrypt.compareSync(password, user.password)

            if (!isAuthenticated) {
                return res.status(401).send('username or password incorrect')
            }

            delete user.password
            req.session.user = user
            res.send(req.session.user)
            
        } catch (error) {
            console.log('there was an error', error)
            res.status(500).send(error)
        }

    },
    logout: (req, res) => {
        req.session.destroy()
        res.status(200).send()
    },
    getUser: async (req, res) => {
      req.app.get('db').user.find_user_by_username(req.session.username)
      .then(user => res.status(200).send(user[0]))
  }
}