import React from 'react'
import { useState } from 'react'
import api from '../api/axios'
import { useEffect } from 'react'
import "../components/Snippets.css"
import ViewCodeModal from '../components/ViewCodeModal'
import { useAuth } from '../context/AuthContext'
import {useNavigate} from 'react-router-dom'




function MySnippets() {
    const [snippet, setSnippets] = useState([])
    const [selectedSnippet, setSelectedSnippet] = useState(null)
    const navigate = useNavigate()
    const {accessToken} = useAuth()

    useEffect(() => {
        const getmysnippets = async () => {
            try {
                const res = await api.get('/snippets/mine')
                setSnippets(res.data)
            }
            catch (error) {
                console.error("Fetch error: ", error)
            }

        }
        getmysnippets()
    }, [accessToken])

    const editSnippet = (id) => {
        navigate(`/editSnippet/${id}`)
    }

    const deleteSnippet = async (id) => {
        let confirm = window.confirm('Do you want to delete this item?')
        if (!confirm) {
            return
        }
        try {
            await api.delete(`/snippets/${id}`).then((res) => { console.log(res) })
            window.alert(`the Snippet is deleted successfully`)
            setSnippets(prev => prev.filter(snippet => snippet._id !== id))
        } catch (error) {
            console.error('error deleting snippet', error)
            alert(`Failed to delete.`)
        }
    }

    const viewSnippet = (snippet) => {
        setSelectedSnippet(snippet)
    }
    const closeModal = () => {
        setSelectedSnippet(null)
    }

    return (
        <>
            <div className="snippets-container">
                <h1>My Snippets</h1>

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
                                    <button onClick={() => { viewSnippet(snippet) }} className='btn'>View</button>
                                    <button onClick={() => { editSnippet(snippet._id) }} className='btn'>edit</button>
                                    <button onClick={() => { deleteSnippet(snippet._id) }} className='delete-btn'>delete</button>


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

export default MySnippets