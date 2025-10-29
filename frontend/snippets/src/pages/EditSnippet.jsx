import axios from 'axios'
import React from 'react'
import { useLoaderData, useNavigate } from 'react-router-dom'
import SnippetForm from '../components/SnippetForm'
import api from '../api/axios'

function EditSnippet() {
    const navigate = useNavigate()
    const snippet = useLoaderData()

    const handleUpdate = async(snippetData)=>{
        try{
            await api.put(`/snippets/${snippet._id}`,snippetData);
            navigate('/')
        } catch(error){
            console.log(`Error Updating Snippet`, error)
        }
    }
  return (
    <>
    <div className="form-page-container">
        <h1>Edit Snippet</h1>
        <SnippetForm onSubmit= {handleUpdate} initialData = {snippet}/>
    </div>
    </>
  )
}

export default EditSnippet