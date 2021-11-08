const express = require('express');
const router = express.Router();
const passport = require('passport');
const userActions = require('../mongodb/usersActions');

// Register
router.post('/register', async (req, res) => {

  userActions.insertUser(req.body.data).then(result => {
    if (result) {
      res.sendStatus(200).json({ data: result });
    } else {
      res.sendStatus(400).json({ data: "User Already Exists" });
    }
  }).catch(err => {
    console.log(err);
    res.sendStatus(400);
  });
});

router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) throw err;
    if (!user) res.send("No User Exists");
    else {
      req.logIn(user, (err) => {
        if (err) throw err;
        res.send("Successfully Authenticated");
        console.log(req.user);
      });
    }
  })(req, res, next);
});

router.get('/', (req, res) => {
  console.log(req.user);
  if(req.user){
    req.user.status = 200;
    res.json(req.user);
  }else{
    res.json({status: 400});
  }
})

// // Logout
// router.get('/logout', (req, res) => {
//   req.logout();
//   req.flash('success_msg', 'You are logged out');
//   res.redirect('/users/login');
// });

module.exports = router;
