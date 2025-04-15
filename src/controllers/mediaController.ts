import type { Request, Response } from "express";
import { Media, Recipe } from "../database/association";

export default {
	getAllMedias: async (req: Request, res: Response): Promise<void> => {
		try {
			const media = await Media.findAll();
			res.status(200).json(media);
		} catch (error) {
			res.status(500).json({ error: "Internal Server Error" });
		}
	},
	getMediaById: async (req: Request, res: Response): Promise<void> => {
		const mediaId = req.params.id;

		try {
			const media = await Media.findByPk(mediaId);
			if (!media) {
				res.status(404).json({ error: "Media not found" });
				return;
			}
			res.status(200).json(media);
		} catch (error) {
			res.status(500).json({ error: "Internal Server Error" });
		}
	},
	getMediaRecipes: async (req: Request, res: Response): Promise<void> => {
		const mediaId = req.params.id;
		try {
			const media = await Media.findByPk(mediaId, {
				include: [Recipe],
			});
			if (!media) {
				res.status(404).json({ error: "Media not found" });
				return;
			}
			res.status(200).json(media);
		} catch (error) {
			res.status(500).json({ error: "Internal Server Error" });
		}
	},
};
