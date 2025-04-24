import type { Request, Response } from "express";
import { Media, Recipe } from "../database/association";
import { Op } from "sequelize";
import type { FindOptions } from "sequelize";

export default {
	getAllMedias: async (req: Request, res: Response): Promise<void> => {
		const {
			title,
			limit = "25",
			offset = "0",
		} = req.query as {
			title: string;
			limit: string;
			offset: string;
		};

		const numLimit = Number.parseInt(limit, 10);
		const numOffset = Number.parseInt(offset, 10);

		let where = {};
		if (title) {
			where = {
				...where,
				title: {
					[Op.like]: `%${title}%`,
				},
			};
		}

		const queryOptions: FindOptions<Media> = {
			where,
			limit: numLimit,
			offset: numOffset,
			include: [
				{
					association: "Recipes",
					required: false,
				},
			],
		};

		const medias = await Media.findAll(queryOptions);
		res.status(200).json(medias);
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
				include: [
					{
						association: "Recipes",
						include: [
							{
								association: "Category",
							},
						],
					},
				],
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
