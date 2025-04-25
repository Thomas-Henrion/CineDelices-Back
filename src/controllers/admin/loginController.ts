import { User } from "../../database/association";
import { Request, Response } from "express";

export default {

 loginForm : async (req: Request, res: Response): Promise<void> => {
    try {
      res.render("auth");
    } catch (error) {
      res.status(500).send("Error rendering create login form");
    }
  },

}