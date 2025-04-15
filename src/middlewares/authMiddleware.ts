import Jwt from "jsonwebtoken";
import type { NextFunction, Request, Response } from "express";
import { User } from "../database/association";

// Middleware to check if the user is authenticated
export const isAuthenticated = async (
	req: Request,
	res: Response,
	next: NextFunction,
): Promise<void> => {
	const token = req.headers.authorization;

	if (!token) {
		res.status(401).json({ message: "Unauthorized" });
		return;
	}

	try {
		const decoded = Jwt.verify(token, process.env.JWT_SECRET as string) as {
			id: number;
		};

		const user = await User.findOne({
			where: { id: decoded.id },
		});

		if (!user) {
			res.status(401).json({ message: "Unauthorized" });
			return;
		}

		req.user = user;

		next();
	} catch (error) {
		res.status(401).json({ message: "Unauthorized" });
	}
};
