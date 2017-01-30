//Middleware function used in routes.js to check if the user is logged in whenever going to different endpoints.
//req.isAuthenticated is a method from passport.js which is required in routes.js
const isLoggedIn = function (req, res, next) {
  if (req.isAuthenticated()){
    next();
  } else {
    res.redirect('/');
  }
}

module.exports = isLoggedIn;