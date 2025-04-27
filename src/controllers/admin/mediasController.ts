import { Media } from "../../database/association";
import type { Request, Response } from "express";

export default {

  
  getAllMedias: async (req: Request, res: Response): Promise<void> => {
    try {
      const medias = await Media.findAll();
      res.render("medias/medias", { medias });
    } catch (error) {
      res.render("404");
    }
  },

  getMediaById: async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const media = await Media.findByPk(id);
      if (!media) {
        res.status(404).send("Media par ID not found");
        return;
      }
      res.render("medias/mediaId", { media });
    } catch (error) {
      res.status(500).send("Error fetching media");
    }
  },

  createForm: async (req: Request, res: Response): Promise<void> => {
    try {
      res.render("medias/addMedia");
    } catch (error) {
      res.status(500).send("Error rendering create media form");
    }
  },

  createMedia: async (req: Request, res: Response): Promise<void> => {
    try {
      const media = await Media.create(req.body);
      res.redirect("/admin/medias");
    } catch (error) {
      res.status(500).send("Error creating media");
    }
  },

  updateForm: async (req: Request, res: Response): Promise<void> => {
    try {
      const media = await Media.findByPk(req.params.id);
      if (!media) {
        res.status(404).send("Form Media  not found");
        return;
      }
      res.render("medias/updateMedia", { media });
    } catch (error) {
      res.status(500).send("Error fetching media for update");
    }
  },

  updateMedia: async (req: Request, res: Response): Promise<void> => {
    try {
      const MediaID = req.params.id;
      const media = await Media.findByPk(MediaID);

      if (!media) {
        res.status(404).send("Media update not found");
        return;
      }

      await media.update(req.body, {
        where: {
          id: MediaID,
        },
      });
      
      res.redirect("/admin/medias");
    } catch (error) {
      res.status(500).send("Error updating media");
    }
  },

  deleteMedia: async (req: Request, res: Response): Promise<void> => {
    try {
      const deleteID = req.params.id;

      const media = await Media.findByPk(deleteID);
      if (!media) {
        res.status(404).send("Media delete not found");
        return;
      }
      await media.destroy();
      res.redirect("/admin/medias");
    } catch (error) {
      console.error("Erreur serveur :", error);
      res.status(500).send("Error deleting media");
    }
  },
};
