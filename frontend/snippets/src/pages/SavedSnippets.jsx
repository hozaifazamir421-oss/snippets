import React from 'react'

import { useState } from 'react'
import api from '../api/axios'
import { useEffect } from 'react'
import "../components/Snippets.css"
import ViewCodeModal from '../components/ViewCodeModal'
import { useAuth } from '../context/AuthContext'
import {useNavigate} from 'react-router-dom'

function SavedSnippets() {
    const [snippet, setSnippets] = useState([])
    const [selectedSnippet, setSelectedSnippet] = useState(null)
    const navigate = useNavigate()
    const {accessToken, user, setUser} = useAuth()
   

    useEffect(() => {
        const getSavedSnippets = async () => {
            try {
                const res = await api.get('/snippets/saved/me')
                setSnippets(res.data)
            }
            catch (error) {
                console.error("Fetch error: ", error)
                
            }

        }
        getSavedSnippets()
    }, [accessToken])

    // const editSnippet = (id) => {
    //     navigate(`/editSnippet/${id}`)
    // }

    // const deleteSnippet = async (id) => {
    //     let confirm = window.confirm('Do you want to delete this item?')
    //     if (!confirm) {
    //         return
    //     }
    //     try {
    //         await api.delete(`/snippets/${id}`).then((res) => { console.log(res) })
    //         window.alert(`the Snippet is deleted successfully`)
    //         setSnippets(prev => prev.filter(snippet => snippet._id !== id))
    //     } catch (error) {
    //         console.error('error deleting snippet', error)
    //         alert(`Failed to delete.`)
    //     }
    // }

    const viewSnippet = (snippet) => {
        setSelectedSnippet(snippet)
    }
    const closeModal = () => {
        setSelectedSnippet(null)
    }

    //save handled================================================
    const handleSave = async(id)=>{
        if(!user){
            alert("Login to save snippet")
            return
        }
        try {
            const res = await api.post(`/snippets/save/${id}`)
            const isAdded = res.data.saved
            setUser(prevUser =>{
                const currSaved = prevUser.savedSnippets || [];
                if(isAdded){
                    return {...prevUser, savedSnippets: [...currSaved, id]}
                } else{
                    return {...prevUser, savedSnippets: currSaved.filter(snippetId => snippetId !== id)}
                }
            })
        } catch (error) {
            console.error(error)
        }
    }
  return (
    <>
    <div className="snippets-container">
                <h1>Saved Snippets</h1>

                <div className="snippet-list">

                    {snippet && snippet.length > 0 ? (

                        // the yes path starts_-----------------------------
                        snippet.map((snippet) => {
                            const isSaved = user && (user?.savedSnippets?.includes(snippet._id)) || false
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
                                    <span className={`visibility-badge ${snippet.visibility.toLowerCase()}`}>
                                    {snippet.visibility}
                                    </span>
                                    <div>
                                    <button onClick={() => { viewSnippet(snippet) }} className='btn'>View</button>
                                    
                                    <button className='btn' onClick={()=>{handleSave(snippet._id)}}>{isSaved? "Unsave" : "Save"}</button>
                                    
                                    
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
            {selectedSnippet &&
                <ViewCodeModal
                    onClose={closeModal} snippet={selectedSnippet} />}

    </>
  )
}

export default SavedSnippets