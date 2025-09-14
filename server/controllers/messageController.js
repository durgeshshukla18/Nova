import imagekit from "../configs/imageKit.js";
import Chat from "../models/Chat.js";
import User from "../models/user.js";
import axios from 'axios';
import openai from "../configs/openai.js";




// Text-based AI Chat message controller
export const textMessageController = async (req, res) => {
  try {
    const userId = req.user._id;

    // Credit validation
    if (req.user.credits < 1) {
      return res.json({ success: false, message: "You don't have enough credits to use this feature" });
    }

    const { chatId, prompt } = req.body;
    const chat = await Chat.findOne({ userId, _id: chatId });
    if (!chat) return res.json({ success: false, message: "Chat not found" });

    // Push user message
    chat.messages.push({
      role: "user",
      content: prompt,
      timestamp: Date.now(),
      isImage: false,
    });

    // Generate AI response
    const { choices } = await openai.chat.completions.create({
      model: "gemini-2.0-flash",
      // messages: [{ role: "user", content: prompt }],
      messages: [
    {
      role: "system",
      content: `You are a helpful AI assistant named Nova. Always provide clear, concise, and humanized responses.
        Guidelines:  
        - Keep answers relevant and avoid unnecessary details.  
        - Write in a conversational yet professional tone.  
        - Aim for a medium-length response (around 250–350 words).  
        - Use simple language that a non-expert can easily understand.  
        - Whenever helpful, include examples, bullet points, or small tables to illustrate ideas clearly.  
        - Avoid being overly formal or robotic—make it feel like advice from a knowledgeable friend.  
        - If a question is ambiguous, clarify assumptions briefly instead of guessing.
        - Never give negative or discouraging responses. If there’s a limitation, frame it positively (e.g., “Here’s a better way to approach this” instead of “This is not possible”).
        - Always leave the user feeling motivated, supported, and optimistic.
        `
    },
    {
      role: "user",
      content: prompt
    }
  ],
    });

    const reply = {
      role: "assistant",
      content: choices[0].message.content,
      timestamp: Date.now(),
      isImage: false,
    };

    chat.messages.push(reply);

    // Save both chat + update credits
    await Promise.all([
      chat.save(),
      User.updateOne({ _id: userId }, { $inc: { credits: -1 } }),
    ]);

    // Fetch updated user (to send new credits count)
    const updatedUser = await User.findById(userId).select("credits");

    return res.json({
      success: true,
      reply,
      updatedChat: chat,
      updatedUser,
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};



// Image generation message controller
export const imageMessageController = async (req, res) => {
  try {
    const userId = req.user._id;

    if (req.user.credits < 2) {
      return res.json({ success: false, message: "You don't have enough credits to use this feature" });
    }

    const { prompt, chatId, isPublished } = req.body;
    const chat = await Chat.findOne({ userId, _id: chatId });
    if (!chat) return res.json({ success: false, message: "Chat not found" });

    // Push user message
    chat.messages.push({
      role: "user",
      content: prompt,
      timestamp: Date.now(),
      isImage: false,
    });

    // Generate image with ImageKit
    const encodedPrompt = encodeURIComponent(prompt);
    const generatedImageUrl = `${process.env.IMAGEKIT_URL_ENDPOINT}/ik-genimg-prompt-${encodedPrompt}/Nova/${Date.now()}.png?tr=w-800,h-800`;
    const aiImageResponse = await axios.get(generatedImageUrl, { responseType: "arraybuffer" });
    const base64Image = `data:image/png;base64,${Buffer.from(aiImageResponse.data, "binary").toString("base64")}`;

    const uploadResponse = await imagekit.upload({
      file: base64Image,
      fileName: `${Date.now()}.png`,
      folder: "Nova",
    });

    const reply = {
      role: "assistant",
      content: uploadResponse.url,
      timestamp: Date.now(),
      isImage: true,
      isPublished,
    };

    chat.messages.push(reply);

    await Promise.all([
      chat.save(),
      User.updateOne({ _id: userId }, { $inc: { credits: -2 } }),
    ]);

    const updatedUser = await User.findById(userId).select("credits");

    return res.json({
      success: true,
      reply,
      updatedChat: chat,
      updatedUser,
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
