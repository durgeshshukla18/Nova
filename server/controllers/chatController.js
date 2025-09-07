import Chat from "../models/Chat.js";


// API controller for chat application

export const createChat = async(req, res) => {
    // const { userId, userName, name } = req.body;
    try {
        const userId = req.user._id;
        const { name } = req.body;
        const chatData = { 
            userId, 
            userName: req.user.name, 
            name: name || "New Chat", 
            messages: [] };
        await Chat.create(chatData);
        res.status(201).json({ success: true, message: "Chat created successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}


// API controller to get all chats for a user
export const getChats = async(req, res) => {
    try {
        const userId = req.user._id;
        const chats = await Chat.find({ userId }).sort({ updatedAt: -1 });
        res.status(200).json({ success: true, chats });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}


// API controller to delete a chat
export const deleteChat = async(req, res) => {
    const { chatId } = req.body;
    try {
        const userId = req.user._id;
        const chat = await Chat.findOneAndDelete({ _id: chatId, userId });

        await Chat.deleteOne({ _id: chatId, userId });
        if (!chat) {
            return res.status(404).json({ success: false, message: "Chat not found" });
        }
        res.status(200).json({ success: true, message: "Chat deleted successfully" });
        
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }   
}