import React, { useState, useRef, useEffect } from 'react'
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

function Add() {
    const navigate = useNavigate();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [salary, setSalary] = useState('');
    const [date, setDate] = useState('');

    const textInput = useRef(null);

    useEffect(() => {
        textInput.current.focus();
    }, [])

    const handleAdd = async (e) => {
        e.preventDefault();
        if (!firstName || !lastName || !email || !salary || !date) {
            return Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'All fields are required.',
                showConfirmButton: true
            });
        }
        const newEmployee = {
            firstName,
            lastName,
            email,
            salary,
            date
        }
        let resp = await fetch('http://localhost:3001/students', {
            method: 'POST',
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(newEmployee)
        });

        console.log(resp);
        if (resp.status == 201) {
            Swal.fire({
                icon: 'success',
                title: 'Added!',
                text: `${firstName}'s data has been Added.`,
                showConfirmButton: false,
                timer: 1500
            });
            navigate('/');
        } else {
            Swal.fire({
                icon: 'error',
                title: '!',
                text: `some thing went wrong..`,
                showConfirmButton: false,
                timer: 1500
            });
        }


    }


    return (
        <div className="small-container">
            <form className='container' onSubmit={handleAdd}>
                <h1>Add New Employee</h1>
                <h5 font-color='blue'>Please fill all the data careafully</h5>
                <label htmlFor="firstName">First Name</label>
                <input
                    id="firstName"
                    type="text"
                    ref={textInput}
                    name="firstName"
                    value={firstName}
                    onChange={e => setFirstName(e.target.value)}
                />
                <label htmlFor="lastName">Last Name</label>
                <input
                    id="lastName"
                    type="text"
                    name="lastName"
                    value={lastName}
                    onChange={e => setLastName(e.target.value)}
                />
                <label htmlFor="email">Email</label>
                <input
                    id="email"
                    type="email"
                    name="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
                <label htmlFor="salary">Salary ($)</label>
                <input
                    id="salary"
                    type="number"
                    name="salary"
                    value={salary}
                    onChange={e => setSalary(e.target.value)}
                />
                <label htmlFor="date">Date</label>
                <input
                    id="date"
                    type="date"
                    name="date"
                    value={date}
                    onChange={e => setDate(e.target.value)}
                />
                <div style={{ marginTop: '30px' }}>
                    <input type="submit" value="Add" />
                    <input
                        style={{ marginLeft: '12px' }}
                        className="accent-button"
                        type="button"
                        value="Cancel"
                        onClick={() => {
                            navigate('/');
                        }}
                    />
                </div>
            </form>
        </div>
    );
}

export default Add