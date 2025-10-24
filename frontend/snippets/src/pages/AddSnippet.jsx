import React from 'react'
import SnippetForm from '../components/SnippetForm'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


function AddSnippet() {
    const navigate = useNavigate()
    // here snippetData came from the SnippetForm component. it is passed to onSubmit which is actually handlecreate.
    const handleCreate = async(snippetData)=>{
        try{
            await axios.post(`http://localhost:3000/snippets`,snippetData)
            navigate('/')
        }
        catch(error){
            console.error("Error creating snippet", error);
        }
    }
  return (
    <>
    <div className="form-page-container">
        <h1>Add Snippet</h1>
        {/* here we are passing onSubmit as a prop to the snippetform. it will just call the function handlecreate
        when the snippetForm is done with its works and user hits the save or submit button. 
        its name here is written as onSubmit because it shows that this will be called when user submits the snippetform
        it could anything else.
        the snippet form will also pass an object to the onSubmit which means to the handleCreate, it is used as 
        snippetData.*/}
        <SnippetForm onSubmit = {handleCreate}/>
    </div>
    </>
  )
}

export default AddSnippet