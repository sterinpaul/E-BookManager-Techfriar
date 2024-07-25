import express from 'express'
import adminControllers from '../controllers/adminControllers.js';
import { uploadBookCover } from '../middlewares/cloudinaryConfig.js';

const adminRoutes = ()=>{
    const router = express.Router();
    const controllers = adminControllers()

    router.get('/getBooks',controllers.getBooks)
    router.post('/addBook',uploadBookCover,controllers.addBook)
    
    return router
}

export default adminRoutes