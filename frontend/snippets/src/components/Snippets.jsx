import React, { useEffect, useState } from 'react'

import './Snippets.css'
import './buttons.css'

import ViewCodeModal from './ViewCodeModal'
import { useAuth } from '../context/AuthContext'
import api from '../api/axios'


function Snippets() {
    const [search, setSearch] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const {accessToken} = useAuth()
    
    
    const [snippets, setSnippets] = useState([]);
    const [selectedSnippet, setSelectedSnippet] = useState(null);
    const {user} = useAuth()
    const isAdmin = user && (user.role === "ADMIN")
    
    useEffect(() => {
        setLoading(true); 
        setError(null);

        // Set up a timer
        const delayDebounce = setTimeout(async () => {
            // console.log(`inside the fetching part`)
            try {
                // Make the API call using the 'api' instance
                // Pass the search term as a query parameter if it exists
                const res = await api.get(`/snippets`, { // Use the main GET /snippets route
                    params: search ? { search } : {}, // Axios automatically creates ?search=...
                });
                
                setSnippets(res.data); 
            } catch (err) {
                console.error("Error fetching filtered snippets:", err);
                setError("Failed to load snippets."); 
                setSnippets([]);
            } finally {
                setLoading(false); 
            }
        }, 400); // Wait 400ms after the user stops typing

        return () => clearTimeout(delayDebounce);//if typed before 400ms,it will reset time to 400

    }, [search, accessToken]);
    

    
    const deleteSnippet = async (id) => {
        let confirm = window.confirm('Do you want to delete this item?')
        if (!confirm) {
            return
        }
        try {
            await api.delete(`/snippets/admin/${id}`).then((res) => { console.log(res) })
            window.alert(`the Snippet is deleted successfully`)
            setSnippets(prev => prev.filter(snippet => snippet._id !== id))
        } catch (error) {
            console.error('error deleting snippet', error)
            alert(`Failed to delete.`)
        }
    }

    const viewSnippet =(snippet)=>{
        setSelectedSnippet(snippet)
    }
    const closeModal = ()=>{
        setSelectedSnippet(null)
    }
    


  return (
    <>
    <div className="snippets-container">
            <h1>All Snippets</h1>
            {/* Search Input */}
                <input
                    type="text"
                    placeholder="Search snippets by title, tags, or description..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    style={{ // Basic styling, move to CSS later
                        padding: "12px 15px",
                        marginBottom: "2rem",
                        width: "100%",
                        maxWidth: "600px",
                        borderRadius: "var(--radius)",
                        border: "1px solid var(--border-color)",
                        backgroundColor: "var(--color-bg)",
                        color: "var(--color-text)",
                        fontSize: "1rem",
                        
                    }}
                />
            
            {/* Loading/Error/Content Display */}

            { loading?
            (
                    <p>Loading snippets...</p>
                ) : error ? (
                    <p style={{ color: 'red' }}>{error}</p>
                ) :
            
            (<div className="snippet-list">
                
                {snippets && snippets.length > 0 ? (
                    
                    // the yes path starts_-----------------------------
                    snippets.map((snippet) => {
                        const isOwner = user && (snippet.createdBy === user.id || snippet.createdBy?._id === user.id);
                                     
                        return (
                            //card starts -----------------------------------------
                            <div className="snippet-card" key={snippet._id}>
                                
                                <h3>{snippet.title}</h3>
                                
                                {snippet.description && (
                                    <p>{snippet.description}</p>
                                )}

                                
                                <div className="tags-container">
                                    {snippet.tags && snippet.tags.map((tag) => (
                                        <span className="tag" key={tag}>{tag}</span>
                                    ))}
                                </div>

                                <p>ID: {snippet._id}</p>
                                <p>created by: {snippet.createdBy?.username}</p>
                                
                                <div>
                                <button onClick={()=>{viewSnippet(snippet)}} className='btn'>View</button>
                                
                                
                                {isAdmin && (<button onClick={() => { deleteSnippet(snippet._id) }} className='delete-btn'>delete</button>)}

                                <span className={`visibility-badge ${snippet.visibility.toLowerCase()}`}>
                                    {snippet.visibility}
                                </span>
                                </div>
                                
                                
                                
                                
                            </div>
                        );
                    })
                    // --------------- the yes path ends ----------------------------------------
                    // --- card ends ---

                ) : (
                    <p>No snippets found.</p>//the no path
                )}

            </div>)}
        </div>
        {selectedSnippet && 
            <ViewCodeModal
            onClose = {closeModal} snippet = {selectedSnippet}/>}
    </>
  )
}

export default Snippets