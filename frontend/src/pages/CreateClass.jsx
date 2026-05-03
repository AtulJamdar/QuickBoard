import React, { useState } from 'react'
import { createClass } from '../services/api';

const CreateClass = () => {
    const [ className, setClassName] = useState('');
    const [generatedLink, setGeneratedLink] = useState('');
    const [loading, setLoading] = useState(false);

    const handleCreate = async (e) => {
        e.preventDefault();
        if (!className) return alert("please enter a class name");

        setLoading(true);
        try {
            const response = await createClass({ className});

            //Getting the classCode we generated with nanoid.
            const code = response.data.data.classCode;

            //Build the url that the student will click
            const link = `${window.location.origin}/class/${code}`;
            setGeneratedLink(link);
        } catch (error) {
            console.error("Link generation failed:", error);
            alert("Error connecting to server");
        } finally {
            setLoading(false);
        }
    };


  return (
    <div style={{ maxWidth: '500px', margin: '50px auto', fontFamily: 'sans-serif' }}>
            <h2>Step 1: Create Your Class</h2>
            <form onSubmit={handleCreate}>
                <input 
                    type="text"
                    placeholder="e.g. Advanced JavaScript"
                    value={className}
                    onChange={(e) => setClassName(e.target.value)}
                    style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
                />
                <button 
                    disabled={loading}
                    style={{ width: '100%', padding: '10px', backgroundColor: '#007bff', color: 'white', border: 'none', cursor: 'pointer' }}
                >
                    {loading ? 'Generating...' : 'Generate Shareable Link'}
                </button>
            </form>

            {generatedLink && (
                <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#d4edda', border: '1px solid #c3e6cb' }}>
                    <p><strong>Success!</strong> Share this link with students:</p>
                    <input 
                        readOnly 
                        value={generatedLink} 
                        style={{ width: '80%', padding: '5px' }}
                    />
                    <button onClick={() => navigator.clipboard.writeText(generatedLink)}>Copy</button>
                </div>
            )}
        </div>
  );
};

export default CreateClass;
