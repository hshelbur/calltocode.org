const UserModel = require('../database/models/User')

const loginController = {
  _init (LogInUser = UserModel) {
    this.User = LogInUser
    return this
  },
  loginCredentialCheck (req, res) {
    // const loggingInUser = new this.User(req.body.user)
    // const loggingInUserEmail = loggingInUser.email
    // console.log('user email is: ' + loggingInUserEmail)
    const loggingInUserEmail = 'kevinqwq@email.com'
    this.User.findOne({email: loggingInUserEmail}, function (error, user) {
      if (error) {
        console.error(error)
        return res.sendStatus(500).json({message: 'Server error'})
      }

      if (user) {
        console.log(`${user.email} loggedin!`)

        res.json({user})
      } else {
        return res.json({message: 'Email does not exist!'})
      }
    })
  }
}

module.exports = loginController
