import { User } from "../../database/association";
import type { Request, Response } from "express";

export default {
    getAllUsers: async (req: Request, res: Response): Promise<void> => {
        try {
            const users = await User.findAll();
            res.render("users", {users});
        } catch (error) {
            res.render("404")
        }
    },
    
}
