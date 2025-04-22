import { Media } from "../../database/association";
import type { Request, Response } from "express";

export default {
    getAllMedias: async (req: Request, res: Response): Promise<void> => {
        try {
            const medias = await Media.findAll();
            res.render("medias", {medias});
        } catch (error) {
            res.render("404")
        }
    },
    
}