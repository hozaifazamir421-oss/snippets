import React from 'react'
import { useLoaderData, useNavigate } from 'react-router-dom'
import './Snippets.css'


function Snippets() {
    const snips = useLoaderData()
    console.log(snips)
    const navigate = useNavigate()

    const editSnippet=(id)=>{
    navigate(`/editSnippet/${id}`)
  }

  return (
    <>
    <div className="snippets-container">
            <h1>All Snippets</h1>
            
            <div className="snippet-list">
                
                {snips && snips.length > 0 ? (
                    
                    // the yes path starts_-----------------------------
                    snips.map((snippet) => {
                        
                        return (
                            //card starts -----------------------------------------
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
                                <button onClick={()=>{editSnippet(snippet._id)}}>edit</button>
                                <p>{snippet._id}</p>
                                
                                <div className="tags-container">
                                    {snippet.tags && snippet.tags.map((tag) => (
                                        <span className="tag" key={tag}>{tag}</span>
                                    ))}
                                </div>
                                
                            </div>
                        );
                    })
                    // --------------- the yes path ends ----------------------------------------
                    // --- card ends ---

                ) : (
                    <p>No snippets found.</p>//the no path
                )}

            </div>
        </div>
    </>
  )
}

export default Snippets