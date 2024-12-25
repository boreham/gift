import React, {useState, useEffect} from 'react'
import { Link } from "react-router-dom"
import Swal from 'sweetalert2'
import Layout from "../components/Layout"
import { useAddProjectMutation } from '../api/apiSlice'
  
function ProjecCreate() {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('')
    const [addProject, { isLoading, isSuccess, isError }] = useAddProjectMutation()
 
    const handleSave = () => {
        addProject({
            name: name,
            description: description
        })
    }
   
    useEffect(()=>{
        if(isSuccess){
            Swal.fire({
                icon: 'success',
                title: 'Project saved successfully!',
                showConfirmButton: false,
                timer: 1500
            })
            setName('')
            setDescription('')
        }
    },[isSuccess])
 
    useEffect(()=>{
        if(isError){
            Swal.fire({
                icon: 'error',
                title: 'An Error Occured!',
                showConfirmButton: false,
                timer: 1500
            })
        }
    },[isError])
 
    return (
        <Layout>
            <div className="container">
                <h2 className="text-center mt-5 mb-3">Create New Project</h2>
                <div className="card">
                    <div className="card-header">
                        <Link 
                            className="btn btn-outline-info float-right"
                            to="/">View All Projects
                        </Link>
                    </div>
                    <div className="card-body">
                        <form>
                            <div className="form-group">
                                <label htmlFor="name">Name</label>
                                <input 
                                    onChange={(event)=>{setName(event.target.value)}}
                                    value={name}
                                    type="text"
                                    className="form-control"
                                    id="name"
                                    name="name"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="description">Description</label>
                                <textarea 
                                    value={description}
                                    onChange={(event)=>{setDescription(event.target.value)}}
                                    className="form-control"
                                    id="description"
                                    rows="3"
                                    name="description"></textarea>
                            </div>
                            <button 
                                disabled={isLoading}
                                onClick={handleSave} 
                                type="button"
                                className="btn btn-outline-primary mt-3">
                                Save Project
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
   
export default ProjecCreate;