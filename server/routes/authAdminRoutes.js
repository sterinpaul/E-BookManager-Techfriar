import express from 'express';
import authAdminControllers from '../controllers/authAdminControllers.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const authAdminRoutes = () => {
    const router = express.Router();
    const controllers = authAdminControllers();

    router.post('/signin',controllers.signIn)
    router.patch('/forgotPassword',controllers.forgotPassword)
    router.patch('/verifyCode',controllers.verifyCode)
    router.patch('/updatePassword',controllers.updatePassword)
    router.delete('/signout',authMiddleware, controllers.signOut);

    return router;
}

export default authAdminRoutes;