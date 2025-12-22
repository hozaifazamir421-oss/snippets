import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams} from 'react-router-dom'
import SnippetForm from '../components/SnippetForm'
import api from '../api/axios'


function EditSnippet() {
    const navigate = useNavigate()
    const { id } = useParams();
    const [snippet, setSnippet] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchSnippet = async () => {
            try {
                const res = await api.get(`/snippets/${id}`);
                setSnippet(res.data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchSnippet();
    }, [id]);

    if (loading) return <p>Loading...</p>;
    if (!snippet) return <p>Snippet not found</p>;



    const handleUpdate = async (snippetData) => {
        try {
            await api.put(`/snippets/${snippet._id}`, snippetData);
            navigate('/mySnippets')
        } catch (error) {
            console.log(`Error Updating Snippet`, error)
        }
    }
    return (
        <>
            <div className="form-page-container">
                <h1>Edit Snippet</h1>
                <SnippetForm onSubmit={handleUpdate} initialData={snippet} />
            </div>
        </>
    )
}

export default EditSnippet