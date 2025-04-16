import multer from "multer";
import { cloudinaryMulterStorage } from "./cloudinary";

export default multer({
	storage: cloudinaryMulterStorage,
	limits: {
		fileSize: 5 * 1024 * 1024, // 5 MB
	},
});
