import type { Request, Response } from "express";
import { Media, Recipe } from "../database/association";

export default {
    getAllMedias: async (req: Request, res: Response) => {
        try {
            const media = await Media.findAll();
            res.status(200).json(media);
        } catch (error) {
            res.status(500).json({ error: "Internal Server Error" });
        }
    },
    getMediaById: async (req: Request, res: Response) => {
        const mediaId = req.params.id;

        try {
            const media = await Media.findByPk(mediaId);
            if (!media) {
                return res.status(404).json({ error: "Media not found" });
            }
            res.status(200).json(media);
        } catch (error) {
            res.status(500).json({ error: "Internal Server Error" });
        }
    },
    getMediaRecipes: async (req: Request, res: Response) => {
        const mediaId = req.params.id;
        try {
            const media = await Media.findByPk(mediaId, {
                include: [Recipe],
            });
            if (!media) {
                return res.status(404).json({ error: "Media not found" });
            }
            res.status(200).json(media);
        } catch (error) {
            res.status(500).json({ error: "Internal Server Error" });
        }
    }
};
