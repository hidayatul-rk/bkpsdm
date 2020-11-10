import React from 'react';
import './App.css';
// import PageSatu from './Halaman/PageSatu'
// import PageDua from './Halaman/PageDua'
// import DaftarMakanan from './Daftar/DaftarMakanan'
import DarftarMinuman from './Daftar/DaftarMinuman'

function App() {
  return (
    <div className="App">
      <h1>Selasa React</h1>
      {/* <PageSatu /> */}
      <br />
      {/* <PageDua /> */}
      {/* <DaftarMakanan /> */}
      <DarftarMinuman menuMinuman={[
        {
          nama: 'Es Teh',
          harga: 20000
        },
        {
          nama: 'Es Gula Batu',
          harga: 30000
        },
        {
          nama: 'Es Cendol',
          harga: 40000
        }
      ]} />
    </div>
  );
}

export default App;
