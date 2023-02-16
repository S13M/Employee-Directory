import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

import Header from './Header';
import List from './List';

function Dashboard() {

    useEffect(()=>{
        getStudents();
    },[])
    const navigate = useNavigate();
    const [employees, setEmployees] = useState([]);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [isAdding, setIsAdding] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    const getStudents = async ()=>{
        let resp = await fetch('http://localhost:3001/students/');
        resp = await await resp.json();
        setEmployees(resp);
    }

    const handleEdit = (id) => {
        const employee = employees.filter(employee => employee.id === id);
        console.log(employee[0]);
        localStorage.setItem('employee',JSON.stringify(employee[0]));
        navigate('/edit');
        // setIsEditing(true);
    }

    const handleDelete = (id) => {
        Swal.fire({
            icon: 'warning',
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel!',
        }).then(result => {
            fetch('http://localhost:3001/students/'+id, {
                method: 'DELETE',
                headers: {
                    "Content-type": "application/json",
                }
            }).then(()=>{
                Swal.fire({
                    icon: 'success',
                    title: 'Deleted!',
                    text: `Data has been deleted.`,
                    showConfirmButton: false,
                    timer: 1500
                });
                getStudents();
            })
        });
    }


    return (
        <div className='container'>
                <>
                    <Header/>
                    <List
                        employees={employees}
                        handleEdit={handleEdit}
                        handleDelete={handleDelete}
                    />
                </>
            {/* for Add */}
            {/* {isAdding && (
                <Add
                    employees={employees}
                    setEmployees={setEmployees}
                    setIsAdding={setIsAdding}
                />
            )} */}
            {/* for Edit */}
            {/* {isEditing && (
                <Edit
                    employees={employees}
                    selectedEmployee={selectedEmployee}
                    setEmployees={setEmployees}
                    setIsEditing={setIsEditing}
                />
            )} */}
        </div>
    )
}

export default Dashboard;