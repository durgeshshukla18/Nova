import imagekit from "../configs/imageKit.js";
import Chat from "../models/Chat.js";
import User from "../models/user.js";
import axios from 'axios';
import openai from "../configs/openai.js";




// Text-based AI Chat message controller
export const textMessageController = async(req, res) => {
    try {
        const userId = req.user._id;

        // Credit validation
        if(req.user.credits < 1){
            return res.json({success: false, message: "You don't have enough credits to use this feature"});
        }

        const {chatId, prompt} = req.body;

        const chat = await Chat.findOne({userId, _id: chatId});
        chat.messages.push({role: "User", content: prompt, timetamp: Date.now(), isImage: false });

    const { choices } = await openai.chat.completions.create({
        model: "gemini-2.0-flash",
         messages: [
            
            {
                role: "user",
                content: prompt,
            },
        ],
    });

    const reply = {...choices[0].message, timestamp: Date.now(), isImage: false};
    res.json({success: true, reply});

    chat.messages.push(reply);
    await chat.save();

    await User.updateOne({_id: userId}, {$inc: {credits: -1}});

    } catch (error) {
        res.json({success: false, message: error.message});
    }
}


// Image generation message controller
export const imageMessageController = async(req, res) => {
    try {
        const userId = req.user._id;

        //check credits
        if(req.user.credits < 2){
            return res.json({success: false, message: "You don't have enough credits to use this feature"});
        }
        const {prompt, chatId, isPublished} = req.body;

        // Final chat
        const chat = await Chat.findOne({userId, _id: chatId})

        // Push user message
        chat.messages.push({role: "User", content: prompt, timetamp: Date.now(), isImage: false })

        // Encode the prompt
        const encodedPrompt = encodeURIComponent(prompt);

        // Construct ImageKit AI generatio URL
        const generatedImageUrl = `${process.env.IMAGEKIT_URL_ENDPOINT}/ik-genimg-prompt-${encodedPrompt}/Nova/${Date.now()}.png?tr=w-800,h-800`;

        // Trigger generation by fetching from ImageKit
        const aiImageResponse = await axios.get(generatedImageUrl, {responseType: "arraybuffer"});

        // Convert to base-64
        const base64Image = `data:image/png;base64,${Buffer.from(aiImageResponse.data,"binary").toString('base64')}`;

        // Upload to Imagelit Media Library
        const uploadResponse = await imagekit.upload({file: base64Image, fileName: `${Date.now()}.png`, folder: "Nova"});

        const reply = {role: 'assistant',content: uploadResponse.url, timestamp: Date.now(), isImage: true, isPublished};
        res.json({success: true, reply});

        chat.messages.push(reply);
        await chat.save();

        // Credit Updatation
        await User.updateOne({_id: userId}, {$inc: {credits: -2}})
    } catch (error) {
        res.json({success: false, message: error.message});
    }
}