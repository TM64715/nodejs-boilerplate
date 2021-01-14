let users;
let EB;
import { hash } from 'bcrypt';
import 'mongodb'
import { ObjectId } from 'mongodb';
import {genHash} from '../service/encrypt.service';
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
        const {googleId, displayName, username, password} = userInfo
        await users.updateOne({googleId: googleId,}, {$set: {googleId: googleId, username: displayName}}, {upsert: true});
        try {
            let result = await users.findOne({googleId: googleId})
            return({error: null, result: result});
        }
        catch (e) {
            let error = "An error occured while finding document: " + e.toString();
            return({error: error, result: null});
        }
    }
    /**
     * 
     * @param {Object} userInfo
     * @returns {DAOResponse} 
     */

    static async createUser(userInfo) {
        const {username, password} = userInfo;
        try {
            let {hash} = await genHash(password);
            let result = await users.insertOne({username: username, hash: hash})
            return({error: null, result: result})
        }
        catch (e) {
            return({error:e.toString(), result: null})
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
     * @param {String} username - id of a user
     * @returns {DAOResponse}
    */

    static async findByUsername(username) {
        try {
            let doc = await users.findOne({username: username})
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