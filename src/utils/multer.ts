import multer from "multer";
import { cloudinaryMulterStorage } from "./cloudinary";

export default multer({
	storage: cloudinaryMulterStorage,
});
