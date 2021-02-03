import UserDAO from '../dao/usersDAO';
class ResObj {
    constructor(error, data) {
        this.error = error
        this.data = data
    }
    
}


export default class UserController {

    static async register(req, res) {
         const {username, password} = req.body;
         if (!username) {
             res.json(new ResObj("Missing required field: username", null))
             return;
         } else if (!password) {
             res.json(new ResObj("Missing Required Field: password", null))
             return;
         }
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