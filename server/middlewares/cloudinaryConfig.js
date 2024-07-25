import multer from 'multer';
import {CloudinaryStorage } from 'multer-storage-cloudinary';
import {v2 as cloudinary} from 'cloudinary';
import configKeys from '../config/configKeys.js';


cloudinary.config({
    cloud_name: configKeys.CLOUDINARY_CLOUD_NAME,
    api_key: configKeys.CLOUDINARY_API_KEY,
    api_secret: configKeys.CLOUDINARY_SECRET_KEY
})

const bookOptions = {
    cloudinary,
    params:{
        folder: 'books',
        resource_type: 'image',
        allowed_formats : ["jpg","jpeg","png","bmp","tiff","tif","svg","webp","heic"],
        transformation: [{ quality: '70' }],
        public_id: (req,file) => {
            return `book-${Date.now()}-${file.originalname.split(".")[0]}`
        }
    }
}

const bookStorage = new CloudinaryStorage(bookOptions)
export const uploadBookCover = multer({storage:bookStorage}).single('coverImage')
