var passport = require('passport');
var router = require('express').Router();

/* GET Google Authentication API. */
router.get(
    "/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
);
router.get(
    "/google/callback",
    passport.authenticate("google", { failureRedirect: "/", session: false }),
    function(req, res) {
        var user = {
            email:req.user.email
        }
        res.redirect("https://testingassignment.herokuapp.com/"+user.email)
    }
);



module.exports = router;