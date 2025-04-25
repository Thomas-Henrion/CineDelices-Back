import { User } from "../../database/association";
import type { Request, Response } from "express";

export default {
  getAllUsers: async (req: Request, res: Response): Promise<void> => {
    try {
      const users = await User.findAll();
      res.render("users/users", { users });
    } catch (error) {
      res.render("404");
    }
  },

  createForm: async (req: Request, res: Response): Promise<void> => {
    try {
      res.render("users/addUser");
    } catch (error) {
      res.render("404");
    }
  },

  createUser: async (req: Request, res: Response): Promise<void> => {
    try {
      await User.create(req.body);
      res.redirect("/admin/users");
    } catch (error) {
      console.error("Error creating user:", error);
      res.status(500).send("Error creating user");
    }
  },

  updateForm: async (req: Request, res: Response): Promise<void> => {
    try {
        res.render("users/updateUser", { user: req.user });
    } catch (error) {
      console.error("Error rendering update form:", error);
      res.status(500).send("Error rendering update form");
    }
  },

  
  updateUser: async (req: Request, res: Response): Promise<void> => {
    try {
    
      const userId = req.params.id;
      const user = await User.findByPk(userId);
      if (!user) {
        res.status(404).send("User not found");
        return;
      }
      await user.update(req.body, {
        where: {
          id: userId,
        },
      });
      console.log("User updated successfully:", user);
      res.redirect("/admin/users");
    } catch (error) {
      console.error("Error updating user:", error);
      res.status(500).send("Error updating user");
    }
  },
        
        
  deleteUser: async (req: Request, res: Response): Promise<void> => {
    try {
      const deleteID = req.params.id;

      const user = await User.findByPk(deleteID);
      if (!user) {
        res.status(404).send("User not found");
        return;
      }
      await user.destroy();
      res.redirect("/admin/users");
    } catch (error) {
      console.error("Error deleting user:", error);
      res.status(500).send("Error deleting user");
    }
  },
};
