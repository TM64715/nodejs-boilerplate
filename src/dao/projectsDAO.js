import 'mongodb';
import { ObjectID, Date } from 'mongodb';

let projects;
let EB

export default class ProjectDAO {
    static async injectDB(conn) {
        if (projects) {
            return
        }
        try {
            EB = await conn.db(process.env.EB_NS)
            projects = await conn.db(process.env.EB_NS).collection("projects")
        } catch (e) {
            console.error(
                `Unable to establish a collection handle in moviesDAO: ${e}`,
            )
        }
    }
    /**
     * @param userId - user id found in session
     * @returns {DAOResponse} - id of document
     */

    static async createProject (userId) {
        let currentDate = new Date();
        currentDate.toISOString();
        try {
            let doc = await projects.insertOne({projectName: "", userId: userId, dateCreated: currentDate})
            return({error: null, result: doc})
        }
        catch (e) {
            return({error:e, result: null})
        }
        
    }
}

/**
 * @typedef DAOResponse
 * @property {string | null} error
 * @property {Object} result - result of query
 */