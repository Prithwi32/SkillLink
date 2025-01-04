import express from 'express';
import { getUserChats, getOrCreateConversation, getMessages, sendMessage } from '../controllers/chatController.js';

const router = express.Router();

router.get('/users/chats/:userId', getUserChats);
router.post('/conversation', getOrCreateConversation);
router.get('/messages/:conversationId', getMessages);
router.post('/messages', sendMessage);

export default router;

