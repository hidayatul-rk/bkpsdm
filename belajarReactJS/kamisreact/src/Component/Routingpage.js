import React from 'react';
import { Link } from 'react-router-dom'

function Routingpage() {
    return (
        <div>
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            <Link to="/belajar">Belajar</Link>
        </div>
    )
}

export default Routingpage