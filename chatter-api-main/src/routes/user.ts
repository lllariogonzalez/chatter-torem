import { Router } from 'express';
import { getUser, deleteUser, createUser, logInUser } from '../controllers/user.controller';
import { isAuth } from '../controllers/auth.controller';

const router = Router();

/*
    USERS ROUTES
*/

router.get('/users', isAuth, getUser);
router.delete('/users', isAuth, deleteUser);
router.post('/signup', createUser);
router.post('/login', logInUser);

export default router;
