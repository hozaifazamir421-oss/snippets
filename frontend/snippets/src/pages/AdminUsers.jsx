import React, { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import api from '../api/axios'
import '../css/AdminUsers.css'

function AdminUsers() {
    const {user} = useAuth()
    const [users, setUser] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState()

    useEffect(()=>{
        const fetchUsers = async()=>{
            try {
                const res = await api.get('auth/admin/users')
                setUser(res.data.users)
                
            } catch (error) {
                console.error("Fetch error: ", error)
                setError("Failed to load the users")
            } finally{
                setLoading(false)
            }
        };
         fetchUsers();
    },[])

    const deleteUser =async (id)=>{
        let confirm = window.confirm("Do you want to delete this user?")
        if(!confirm){
            return
        }
        try {
            await api.delete(`auth/admin/${id}`).then((res) => {console.log(res)})
            window.alert('User deleted Successfully!')
            setUser(prev =>prev.filter(user => user._id !== id))
        } catch (error) {
            console.error('failed to delete the user', error)
            alert('failed to delete the user')
        }
    };

    if (loading) return <p>Loading users...</p>;
    if (error) return <p style={{ color: "red" }}>{error}</p>;


  return (
    <>
    <div className="admin-container">
      <h2>Admin – Manage Users</h2>

      <table className="admin-table">
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Role</th>
            <th>Created</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {users.map((u) => (
            <tr key={u._id}>
              <td>{u.username}</td>
              <td>{u.email}</td>
              <td>{u.role}</td>
              <td>{new Date(u.createdAt).toLocaleDateString()}</td>
              <td>
                {u._id === user.id ? (
                  <span className="admin-action-disabled">—</span>
                ) : (
                  <button 
                  className="admin-action-btn"
                  onClick={() => deleteUser(u._id)} >
                    Delete
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </>
  )
}

export default AdminUsers