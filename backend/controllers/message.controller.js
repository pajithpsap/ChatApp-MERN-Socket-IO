import Message from "../models/message.model.js";
import Conversation from "../models/conversation.model.js";

export const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const { id } = req.params;
    const senderId = req.user._id;
    const receiverId = id;
    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
      });
    }
    //console.log(receiverId);
    const newMessage = new Message({
      senderId,
      receiverId,
      message,
    });
    await newMessage.save();
    if (newMessage) {
      conversation.messages.push(newMessage._id);
    }

    // Socket IO Functionality
    await conversation.save();

    return res.status(201).json(newMessage);
  } catch (error) {
    console.log("Error in sendmsg controller ", error.message);
    res.status(500).json({
      error: "Internal Server Error",
    });
  }
};

export const getMessages = async (req, res) => {
  try {
    const {id: userToChatId} = req.params;
    const senderId = req.user._id;

    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, userToChatId] },
    }).populate("messages"); // not references, but actual messages

    if(!conversation){
      res.status(200).json([]);
    }

    const messages = conversation.messages;
    res.status(200).json(messages);


  } catch (error) {
    console.log("Error in getMessages controller ", error.message);
    res.status(500).json({
      error: "Internal Server Error",
    });
  }
};
