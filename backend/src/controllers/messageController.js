const Message = require('../models/Message');
const Class = require('../models/Class');

exports.createMessage = async(req, res) => {
    try {
        const { content, classId } = req.body;
        const io = req.app.get('io'); // Get the socket instance we attached in server.js

        //1. Validation: Ensure content and classId exist in request
        if (!content || !classId) {
            return res.status(400).json({
                success: false,
                message: "Please provide message content and classID"
            });
        }

        // 2. Verification: Does this class actually exist?
        // (Industry tip: Prevent "orphan" messages for non-existent classes)
        const classExists = await Class.findById(classId);
        if (!classExists) {
            return res.status(404).json({
                success: false,
                message: "Cannot send message: Class not found"
            });
        }

        //3. Create the message
        const newMessage = await Message.create({
            content,
            classId
        });

        io.to(classId).emit('new-message', newMessage);

        res.status(201).json({
            success: true,
            data: newMessage
        });
    } catch (error) {
        console.error("Message Creation Error:", error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};

exports.getMessagesByClass = async(req, res) => {
    try {
        const { classId } = req.params;

        //Find all messages that belong to this specific classId
        const messages = await Message.find({ classId })
            .sort({ createdAt: 1 }); // 1 for oldest first (chronological), -1 for newest

        res.status(200).json({
            success: true,
            count: messages.length,
            data: messages
        });
    } catch (error) {
        console.error("Fetch Messages Error: ", error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};