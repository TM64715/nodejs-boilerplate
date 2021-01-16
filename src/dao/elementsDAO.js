import 'mongodb';
import {ObjectId } from 'mongodb'
let elements;
let CMS;
class Element {
    constructor(category, display, image, bullets) {
        this.category = category;
        this.display = display;
        this.image = image
        this.bullets = bullets;
    }
}
export default class ElementController {
    static async injectDB(conn) {
        if (elements) {
            return
        }
        try {
            CMS = await conn.db(process.env.CMS_NS)
            elements = await CMS.collection("elements")
        } catch (e) {
            console.error(
                `Unable to establish a collection handle in moviesDAO: ${e}`,
            )
        }
    }
    /**
     * @param {String} category category or heading
     * @param {String} display timeline or overview
     * @param {URL | false} image a url of image or false if none supplied
     * @param {Array} bullets Array of bulleted information
     * @param {String} id
     */

    static async save(category, display, image, bullets, id) {
        try {
            let element = new Element(category, display, image, bullets);
            let result = await elements.updateOne(
                {_id: ObjectId(id)}, 
                {$set: element}, 
                {upsert: true});
            return({error: null, result: result})
        } catch (e) {
            return({error: e, result: null});
        }
    }

    static async retrieve() {
        try {
            let result = await elements.find({}).toArray()
            return ({error: null, result: result})
        }
        catch(e) {
            return({error: e, result: null})
        }
    }
    /**
     * @param {String} id 
     */

    static async delete(id) {
        try {
            let result = await elements.deleteOne({_id: ObjectId(id)})
            return ({error: null, result: result})
        }
        catch(e) {
            return({error: e, result: null})
        }
    }
}

/**
 * @typedef DAOResponse
 * @property {string | null} error
 * @property {Object} result - result of query
 */