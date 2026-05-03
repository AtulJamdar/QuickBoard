import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { io } from 'socket.io-client'; // Import the client
import { getClassDetails, getMessages, sendMessage } from '../services/api';

const ClassRoom = () => {
    const {classCode} = useParams();
    const [classData, setClassData] = useState(null);
    const [classId, setClassId] = useState(null); //Added state to store internal DB _id
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            try {
                //1. Get Class Details (to get the internal _id)
                const classRes = await getClassDetails(classCode);
                const internalId = classRes.data.data._id;
                setClassId(internalId); //Save ID to state for handleSend
                setClassData(classRes.data.data);

                //2. Load existing messages from DB
                const msgRes = await getMessages(internalId);
                setMessages(msgRes.data.data);
            } catch (err) {
                console.error("Failed to load classsroom", err);
            }finally {
                setLoading(false);
            }
        };
        loadData();
    },[classCode]);

    // Socket Logic
    useEffect(() => {
        if(!classId) return;

        const socket = io("http://localhost:5000");

        //Join specific room
        socket.emit('join-class', classId);

        //Listen for new messages
        socket.on('new-message', (newMessage) => {
            //Functional update: adding new message to current list
            setMessages((prev) => [...prev, newMessage]);
        });

        //Cleanup on unmount
        return () => {
            socket.off('new-message');
            socket.disconnect();
        };
    },[classId]);

    //Logic: Send a new doubt

    const handleSend = async (e) => {
        e.preventDefault();
        if(!input.trim()) return;

        try{
            await sendMessage({content: input, classId: classId});
            setInput(''); //Clear input after sending
            //Note
        } catch (err) {
            alert("Error sending message");
        }
    };

    if (loading) return <p>Loading your classroom...</p>;
    if (!classData) return <p>Classroom not found!</p>;
    
  return (
    <div style={{ padding: '20px' }}>
            <h1>{classData.className}</h1>
            <p>Instructor: {classData.instructor}</p>
            <hr />
            
            <div className="message-list">
                {setMessages.length === 0 ? (
                    <p>No doubts yet. Be the first to ask!</p>
                ) : (
                    messages.map((msg) => (
                        <div key={msg._id} style={{ 
                            background: '#f0f2f5', 
                            padding: '10px', 
                            margin: '10px 0', 
                            borderRadius: '8px' 
                        }}>
                            {msg.content}
                        </div>
                    ))
                )}
            </div>

            <form onSubmit={handleSend}>
                <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="I'm stuck on..."
                />
                <button type="submit">Ask</button>
            </form>
        </div>
  );
};

export default ClassRoom;
