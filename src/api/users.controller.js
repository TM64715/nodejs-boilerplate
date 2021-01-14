import UserDAO from '../dao/usersDAO';

export default class UserController {
    static async login (req, res) {
    }

    static async register(req, res) {
         const {username, password} = req.body;
         try {
            let {result, error} = await UserDAO.createUser({username: username, password: password})
            if (error) {
                res.json({error: error, user: result, stage: "if1"})
            }
            else {
                req.login(result, (err) => {
                    res.json({error: err, user: result, stage: "else1"})
                })
                
            }
         } catch(e) {
             console.error(e);
             res.json({error: e.toString(), user: null, stage: "catch"})
         }
    }
}