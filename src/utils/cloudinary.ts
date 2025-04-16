import { v2 as cloudinary } from "cloudinary";
import dotenv from "./dotenv";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import path from "path";

export default cloudinary.config({
	cloud_name: dotenv.CLOUDINARY.NAME,
	api_key: dotenv.CLOUDINARY.API_KEY,
	api_secret: dotenv.CLOUDINARY.API_SECRET,
});

export const cloudinaryMulterStorage = new CloudinaryStorage({
	cloudinary,
	params: (req, file) => {
		const folderPath = "default";
		const fileExtension = path.extname(file.originalname).substring(1);
		const allowedExtensions = ["jpeg", "png", "webp"];
		if (!allowedExtensions.includes(fileExtension)) {
			throw new Error(
				"Invalid file type. Only JPEG, PNG, and WEBP are allowed.",
			);
		}
		const publicId = `${file.fieldname}-${Date.now()}`;

		return {
			folder: folderPath,
			public_id: publicId,
			format: fileExtension,
		};
	},
});
