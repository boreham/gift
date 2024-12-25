import React, { useState, useEffect } from 'react'
import { Link, useParams } from "react-router-dom"
import Swal from 'sweetalert2'
import { useGetProjectQuery , useUpdateProjectMutation } from '../api/apiSlice'
import Layout from "../components/Layout"
  
function ProjectEdit() {
    const id = useParams().id
    const [name, setName] = useState('');
    const [description, setDescription] = useState('')
    const {data:project = {}, isSuccess, status } = useGetProjectQuery({id: id})
    const [updateProject, { isLoading, isSuccess:IsUpdateSuccess, isError }] = useUpdateProjectMutation()
 
    useEffect(()=>{
        if(status && isSuccess){
            setName(project?.name)
            setDescription(project?.description)
        }
    },[status, isSuccess])
   
    const handleSave = () => {
        updateProject({id:id, name:name, description:description})
    }
   
    useEffect(()=>{
        if(IsUpdateSuccess){
            Swal.fire({
                icon: 'success',
                title: 'Project updated successfully!',
                showConfirmButton: false,
                timer: 1500
            })
            setName('')
            setDescription('')
        }
    },[IsUpdateSuccess])
 
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
                <h2 className="text-center mt-5 mb-3">Edit Project</h2>
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
                                className="btn btn-outline-success mt-3">
                                Update Project
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
   
export default ProjectEdit;