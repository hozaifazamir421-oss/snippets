import React, { useEffect, useState } from 'react'
import { useLoaderData, useNavigate } from 'react-router-dom'
import './Snippets.css'
import './buttons.css'
import axios from 'axios'
import ViewCodeModal from './ViewCodeModal'


function Snippets() {
    const snips = useLoaderData()
    console.log(snips)
    const navigate = useNavigate()
    const [snippet, setSnippet] = useState();
    const [selectedSnippet, setSelectedSnippet] = useState(null);
    
    useEffect(()=>{
        setSnippet(snips)
    },[snips])

    const editSnippet=(id)=>{
    navigate(`/editSnippet/${id}`)
    }

    const deleteSnippet =async(id)=>{
        let confirm = window.confirm('Do you want to delete this item?')
        if(!confirm){
            return 
        }
        try{await axios.delete(`http://localhost:3000/snippets/${id}`).then((res)=>{console.log(res)})
        window.alert(`the Snippet is deleted successfully`)
        setSnippet(prev=>prev.filter(snippet=>snippet._id !== id))
        }catch(error){
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
            
            <div className="snippet-list">
                
                {snippet && snippet.length > 0 ? (
                    
                    // the yes path starts_-----------------------------
                    snippet.map((snippet) => {
                        
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
                                <button onClick={()=>{viewSnippet(snippet)}} className='btn'>View</button>
                                <button onClick={()=>{editSnippet(snippet._id)}} className='btn'>edit</button>
                                <button onClick={()=>{deleteSnippet(snippet._id)}} className='delete-btn'>delete</button>
                                
                                
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
        {selectedSnippet && 
            <ViewCodeModal
            onClose = {closeModal} snippet = {selectedSnippet}/>}
    </>
  )
}

export default Snippets