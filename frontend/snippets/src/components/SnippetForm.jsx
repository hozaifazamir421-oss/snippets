import React, { useState } from 'react'
import './SnippetForm.css'
function SnippetForm({onSubmit, initialData = {}}) {
  const [formData, setFormData] = useState({
    title: initialData.title|| "",
    description: initialData.description || "",
    code: initialData.code || "",
    tags: initialData.tags? initialData.tags.join(", ") : ""

  })

  const handleChange = (e)=>{
    const {name, value} = e.target
    setFormData((prev) =>({...prev, [name]: value}) )
  }

  const handleSubmit = (e)=>{
    e.preventDefault()
    const snippetData = {
      ...formData,
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag=> tag.length>0)
    }
    onSubmit(snippetData)
  }




  return (
    <>
    <form onSubmit={handleSubmit} className='snippet-form'>
      <div >
        <label >Title</label>
        <input 
          name = "title"
          value={formData.title}
          onChange={handleChange}
          required />
      </div>

      <div>
        <label >Description</label>
        <textarea 
          name = "description"
          value={formData.description}
          onChange={handleChange}
          rows= "3"
          />
      </div>
      <div>
        <label >code</label>
        <textarea 
          name = "code"
          value={formData.code}
          onChange={handleChange}
          required
          rows= "6"
          />
      </div>
      <div>
        <label >tags</label>
        <input 
          name = "tags"
          value={formData.tags}
          onChange={handleChange}
          placeholder='eg. cpp, js, react'
          />
      </div>

      <button type='submit'
      >
        {initialData.title? "Save Changes": "Add Snippet"}
        </button>


    </form>

    </>
  )
}

export default SnippetForm