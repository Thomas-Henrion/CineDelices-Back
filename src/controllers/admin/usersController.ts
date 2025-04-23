import { User } from "../../database/association";
import type { Request, Response } from "express";

export default {
    getAllUsers: async (req: Request, res: Response): Promise<void> => {
        try {
            const users = await User.findAll();
            res.render("users/users", {users});
        } catch (error) {
            res.render("404")
        }
    },

    createForm: async (req: Request, res: Response): Promise<void> => {
        try {
            res.render("users/addUser");
        } catch (error) {
            res.render("404")
        }
    },

    CreateUser: async (req: Request, res: Response): Promise<void> => {
        try {
           
            await User.create(req.body);
            res.redirect("/admin/users");
        } catch (error) {
            console.error("Error creating user:", error);
            res.status(500).send("Error creating media");
          }
        },


    
    
}
