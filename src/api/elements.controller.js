import ElementsDAO from '../dao/elementsDAO';

export default class ElementController {
    static async index (req, res) {
        const {category, display, image, bullets, id} = req.body;
        const {error, result} = await ElementsDAO.save(category, display, image, bullets, id);
        res.json({error: error ? error.toString() : error, result: result});
    }

    static async retrieve (req, res) {
        try {
            const {error, result} = await ElementsDAO.retrieve()
            res.json({error: error ? error: error, result: result})
        } catch(e) {
            res.json({error: e.toString(), result: null})
        }
        
    }

    static async deleteById(req, res) {
        const {id} = req.body
        const {error, result} = await ElementsDAO.delete(id);
        res.json({error: error ? error.toString() : error, result: result});
    }
}