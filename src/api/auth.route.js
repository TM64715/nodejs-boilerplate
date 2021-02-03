import { Router } from "express"
import passport from "passport";
import UserController from './users.controller';
const router = new Router();

router.get('/google', passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] }))

router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/login'}), (req, res) => {
    
    let redirectUrl = `${process.env.CLIENT_APP_URL}?displayName=${req.user.displayName}`
    console.log(redirectUrl);
    res.redirect(redirectUrl);
})

router.post('/register', UserController.register)
router.post('/login',
  passport.authenticate('local', 'google'),
    function(req, res) {
      // If this function gets called, authentication was successful.
      // `req.user` contains the authenticated user.
      let shallowObj = req.user;
      delete shallowObj.hash;
      res.json(shallowObj);
});


export default router;