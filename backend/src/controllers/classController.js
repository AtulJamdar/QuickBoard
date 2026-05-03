const Class = require('../models/Class');
const { nanoid } = require('nanoid');

exports.createClass = async(req, res) => {
    try {
        const { className, instructor } = req.body;

        //Generate a short, unique 6-character code for the class link
        const generatedCode = nanoid(6);

        const newClass = await Class.create({
            className,
            instructor,
            classCode: generatedCode
        });

        res.status(201).json({
            success: true,
            data: {
                id: newClass._id,
                className: newClass.className,
                classCode: newClass.classCode,
                shareLink: `http://localhost:5173/class/${newClass.classCode}`
            }
        });
    } catch (error) {
        console.error('Create class Error:', error);
        res.status(500).json({
            success: false,
            message: 'Server Error: Could not create class',
        });
    }
}

exports.getClassByCode = async(req, res) => {
    try {
        const { id } = req.params; // This 'id' will be the classCode from the URL

        //Find the class in DB
        const foundClass = await Class.findOne({ classCode: id });

        // ❌ Check: If class doesn't exist
        if (!foundClass) {
            return res.status(404).json({
                success: false,
                message: `Class with code ${id} not found.`
            });
        }

        res.status(200).json({
            success: true,
            data: foundClass
        });
    } catch (error) {
        console.error("Fetch Class Error:", error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};