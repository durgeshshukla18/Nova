import Chat from "../models/chat";
import User from "../models/user";



// Text-based AI Chat message controller
export const textMessageController = async(req, res) => {
    try {
        const userId = req.user._id;
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
        res.json({success: false, message: error,message});
    }
}


// Image generation message controller
export const imageMessageController = async(req, res) => {
    try {
        const userId = req.user_.id;

        //check credits
        if(req.user.credits < 2){
            return res.json({success: false, message: "You don't have enough credits to use this feature"});
        }
        const {prompt, chatId, isPublished} = req.body;

        // Final chat
        const chat = await Chat.findOne({userId, _id: chatId})

        // Push user message
        chat.messages.push({role: "User", content: prompt, timetamp: Date.now(), isImage: false })
    } catch (error) {
         res.json({success: false, message: error,message});
    }
}