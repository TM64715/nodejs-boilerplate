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



export default router;