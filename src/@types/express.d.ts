import type { User } from "../src/database/association";

declare global {
	namespace Express {
		interface Request {
			user?: User;
		}
	}
}

declare module "express-session" {
	interface SessionData {
	  test: string
	  userId: number;
	  user: User;
	}
  }