import { Router } from 'express';
import { getUserChats, createChat, sendMessage, deleteChat } from '../controllers/chat.controller';
import { isAuth } from '../controllers/auth.controller';

const router = Router();

/*
    CHATS ROUTES
*/

router.get('/chats', isAuth, getUserChats);
router.post('/chats', isAuth, createChat);
router.post('/chats/:chatId', isAuth, sendMessage);
router.delete('/chats/:chatId', isAuth, deleteChat);

export default router;
