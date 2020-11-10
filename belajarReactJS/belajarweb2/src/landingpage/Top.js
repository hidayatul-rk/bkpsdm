import React from 'react';

const Top = () => {
    const handlePesan = () => {
        alert('Pesan dari TOP')
    }
    function pesan() {
        alert('pesan')
    }
    // fungsi "e" untuk tidak auto refresh
    function pesan11(a, b, e) {
        e.preventDefault()
        alert(a)
        alert(b)
    }
    return (
        <div>
            <a href="/" onClick={handlePesan}>Halaman Top</a>
            <br /><a href="/" onClick={pesan}>coba123</a>
            <br /><button href="/" onClick={(e) => pesan11("Berhasil", "Selamat", e)}>Klik</button>
        </div>
    )
    // return (
    //     <a href="/">Halaman Top</a>
    // )
}

export default Top;