import express from 'express'
import bookControllers from '../controllers/bookControllers.js';

const bookRoutes = ()=>{
    const router = express.Router();
    const controllers = bookControllers()
    
    router.get('/getBooks',controllers.getBooks)
    
    return router
}

export default bookRoutes