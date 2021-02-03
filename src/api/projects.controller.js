import ProjectDAO from '../dao/projectsDAO';



export default class ProjectController {
    static async getAllDocs(req, res) {
        // const {}
        res.send("Feature not implemented yet");
    }
    static async createNewDoc(req, res) {        
        const userId = req.user._id;
        const result = await ProjectDAO.createProject(userId);
        res.json(result);

    }
}