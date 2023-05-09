import { Router } from 'express';
import { notFound } from '../controllers/notFound';

const router = Router();

/*
    404 ROUTE
*/
router.use('/', notFound);

export default router;
