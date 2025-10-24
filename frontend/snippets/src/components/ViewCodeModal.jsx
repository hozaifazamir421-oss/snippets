// CodeModal.js
import React, { useState } from 'react';
import './CodeModal.css'; // We will create this in the next step


// We receive the two props: snippet and onClose
function ViewCodeModal({ onClose, snippet }) {
    
    // This logic now lives inside the modal
    const [isCopied, setIsCopied] = useState(false);

    // This logic also lives inside the modal
    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text).then(() => {
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2000); // Reset after 2 seconds
        });
    };

    // This function stops the modal from closing when you click *inside* it
    const stopPropagation = (e) => e.stopPropagation();

    // If there's no snippet, don't render anything
    if (!snippet) {
        return null;
    }

    return (
        // The overlay - click this to close, using the 'onClose' prop
        <div className="modal-overlay" onClick={onClose}>
            
            {/* The content box - clicks here are stopped from closing */}
            <div className="modal-content" onClick={stopPropagation}>

                <div className="modal-header">
                    {/* Use the 'snippet' prop to get the title */}
                    <h3>{snippet.title}</h3>
                    <div>
                        <button
                            className="btn-copy"
                            onClick={() => copyToClipboard(snippet.code)}
                        >
                            {isCopied ? 'Copied!' : 'Copy'}
                        </button>
                        {/* The close button also uses the 'onClose' prop */}
                        <button className="modal-close" onClick={onClose}>&times;</button>
                    </div>
                </div>
                
                {/* Use the 'snippet' prop to get the code */}
                <pre>
                    <code>
                        {snippet.code}
                    </code>
                </pre>
            </div>
        </div>
    );
}

export default ViewCodeModal;