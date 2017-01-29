const bcrypt = require('bcryptjs');

const models = require('../db/models/index');

//uses bcrypt to compare passwords
function comparePass(userPassword, databasePassword) {
  return bcrypt.compareSync(userPassword, databasePassword);
}

// this will redirect a logged in user to their user profile
// page if they're already loggin in.
function loginRedirect(req, res, next) {
  if(req.user) return res.status(401).json(
    { status: 'You are already logged in' }
  );
    return next();
}

// allows users to register
function createUser(req, res) {
  const salt = bcrypt.genSaltSync();
  const hash = bcrypt.hashSync(re.body.password, salt);

  return models.User.create({
    username: req.body.username,
    password: hash,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    dob: req.body.dob
  }).then(() => {
    res.redirect('/');
  });
}
