import type { Request, Response } from "express";

export default {
	getMyProfile: async (req: Request, res: Response): Promise<void> => {
		const user = req.user;
		if (!user) {
			res.status(401).json({
				message: "Unauthorized",
			});
			return;
		}

		res.status(200).json({
			message: "User profile",
			user: {
				id: user.id,
				name: user.name,
				email: user.email,
				createdAt: user.createdAt,
				updatedAt: user.updatedAt,
			},
		});
	},
};
