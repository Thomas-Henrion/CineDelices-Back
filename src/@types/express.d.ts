import type { User } from "../src/database/association";

declare global {
	namespace Express {
		interface Request {
			user?: User;
		}
	}
}
