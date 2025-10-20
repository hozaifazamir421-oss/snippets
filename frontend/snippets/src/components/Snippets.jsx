import React from 'react'
import { useLoaderData } from 'react-router-dom'
import './Snippets.css'


function Snippets() {
    const snips = useLoaderData()
    console.log(snips)

  return (
    <>
    <div className="snippets-container">
            <h1>All Snippets</h1>
            
            <div className="snippet-list">
                
                {snips && snips.length > 0 ? (
                    
                    // --- This is the "block way" you chose ---
                    snips.map((snippet) => {
                        // You now have a "workspace" here to add
                        // console.logs or other logic if you want.
                        // console.log("Rendering:", snippet.title);

                        // You MUST use the 'return' keyword
                        return (
                            <div className="snippet-card" key={snippet._id}>
                                
                                <h3>{snippet.title}</h3>
                                
                                {snippet.description && (
                                    <p>{snippet.description}</p>
                                )}

                                <pre>
                                    <code>
                                        {snippet.code}
                                    </code>
                                </pre>
                                
                                <div className="tags-container">
                                    {snippet.tags && snippet.tags.map((tag) => (
                                        <span className="tag" key={tag}>{tag}</span>
                                    ))}
                                </div>
                            </div>
                        );
                    })
                    // --- End of the "block way" ---

                ) : (
                    <p>No snippets found.</p>
                )}

            </div>
        </div>
    </>
  )
}

export default Snippets