import React from 'react';
import Eksternal from './eksternal'



const Jdl = {
    color: 'blue',
    backgroundColor: 'black',
    marginTop: '50px'
}


function Internal() {
    return (
        <div>
            <p style={Jdl}>INI CSS INTERNAL</p>

            <Eksternal />
        </div>
    )
}

export default Internal