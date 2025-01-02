import User from '../models/user.js';
import Conversation from '../models/conversation.js';
import Message from '../models/message.js';

export const getUserChats = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const conversations = await Conversation.find({ participants: userId })
      .populate('participants', 'name photo about')
      .sort({ updatedAt: -1 });

    const chatUsers = conversations.map(conv => {
      const otherUser = conv.participants.find(p => p._id.toString() !== userId);
      return {
        _id: otherUser._id,
        name: otherUser.name,
        photo: otherUser.photo,
        about: otherUser.about,
        conversationId: conv._id
      };
    });

    res.json(chatUsers);
  } catch (error) {
    console.error('Error in getUserChats:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getOrCreateConversation = async (req, res) => {
  try {
    const { userId, otherUserId } = req.body;
    let conversation = await Conversation.findOne({
      participants: { $all: [userId, otherUserId] }
    });

    if (!conversation) {
      conversation = new Conversation({
        participants: [userId, otherUserId],
        messages: []
      });
      await conversation.save();
    }

    res.json(conversation);
  } catch (error) {
    console.error('Error in getOrCreateConversation:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const sendMessage = async (req, res) => {
  try {
    const { senderId, receiverId, text } = req.body;
    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    if (!conversation) {
      return res.status(404).json({ message: "Conversation not found" });
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      text,
      conversationId: conversation._id,
    });

    await newMessage.save();
    conversation.messages.push(newMessage._id);
    await conversation.save();

    const message = await Message.findOne(newMessage._id)
      .populate("senderId", "_id name")
      .populate("receiverId", "_id name");

    res.status(201).json(message);
  } catch (error) {
    console.error("Error in sendMessage:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getMessages = async (req, res) => {
  try {
    const { conversationId } = req.params;
    const conversation = await Conversation.findById(conversationId)
      .populate({
        path: 'messages',
        populate: {
          path: 'senderId receiverId',
          model: 'User',
          select: 'name'
        }
      });

    if (!conversation) {
      return res.status(404).json({ message: 'Conversation not found' });
    }

    res.json(conversation.messages);
  } catch (error) {
    console.error('Error in getMessages:', error);
    res.status(500).json({ message: 'Server error' });
  }
};