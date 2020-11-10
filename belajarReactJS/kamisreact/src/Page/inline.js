import React from 'react';
// eksternal css file
import './inline.css'
// internal css file
const ket = {
    color: 'white',
    backgroundColor: 'red',
    marginTop: '50px'
}
// =====================


function Inline() {
    return (
        <div>

            <p style={{ color: 'blue', backgroundColor: 'Orange', marginTop: '100px', paddingTop: '50px' }}>Belajar React CSS Inline</p>

            <p style={ket}>Bealajar Penulisan CSS Internal File</p>

            <p className='ketJudul'>Belajar CSS Eksternal 1</p>

            <p id="ketText">Belajar CSS Eksternal 2</p>

        </div>
    )
}

export default Inline