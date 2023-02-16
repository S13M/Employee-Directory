import React from 'react'
import { useNavigate } from 'react-router-dom';


function Header() {
    const navigate = useNavigate();
    return (
        <header>
            <h1>Employee Directory</h1>
            <div style={{ marginTop: '30px', marginBottom: '18px',}}>
                <button onClick={() => navigate('/add')} className= 'accent-button'>Add New Employee</button>
            </div>
        </header>
    )
}

export default Header