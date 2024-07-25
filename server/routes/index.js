import authAdminRoutes from './authAdminRoutes.js'
import adminRoutes from './adminRoutes.js'
import bookRoutes from './bookRoutes.js'
import authMiddleware from '../middlewares/authMiddleware.js';


const routes = (app)=>{
    app.use('/api/adminAuth',authAdminRoutes());
    app.use('/api/admin',authMiddleware,adminRoutes());
    app.use('/api/book',bookRoutes());
}

export default routes