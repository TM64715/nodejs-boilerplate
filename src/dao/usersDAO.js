let users;
let EB;
import 'mongodb'
import { ObjectId } from 'mongodb';
export default class UsersDAO {
    static async injectDB(conn) {
        if (users) {
            return
        }
        try {
            EB = await conn.db(process.env.EB_NS)
            users = await conn.db(process.env.EB_NS).collection("users")
        } catch (e) {
            console.error(
                `Unable to establish a collection handle in moviesDAO: ${e}`,
            )
        }
    }
    /**
     * 
     * @param {Object} userInfo 
     * @param {Function} callback 
     * 
     */
    
    static async findOrCreate(userInfo){
        const {googleId, displayName} = userInfo
        await users.updateOne({googleId: googleId}, {$set: {googleId: googleId, displayName: displayName}}, {upsert: true});
        try {
            let result = await users.findOne({googleId: googleId})
            return({error: null, result: result});
        }
        catch (e) {
            let error = "An error occured while finding document: " + e;
            return({error: error, result: null});
        }
    }
    /** 
     * @param {String} id - id of a user
     * @param {Function} callback 
     * @returns {DAOResponse} Returns an error or a document
    */
    static async findById(id, callback) {
        try {
            let doc = await users.findOne({_id: ObjectId(id)})
            return({error: null, result: doc});
        } catch(e) {
            return({error: e, result: null});
        }

    }
    /**
     * @param {Object} UserInfo
     * @returns {DAOResponse}
     */

    static async deleteUser(UserInfo) {
        try {
            const { _id:id } = UserInfo
            let doc = await users.deleteOne({_id: ObjectId(id)})
            return({error: null, result: doc})
        }
        catch (e) {
            return({error: e, result: null})
        }
    }
    
}

/**
 * @typedef DAOResponse
 * @property {string | null} error
 * @property {Object} result - result of query
 */