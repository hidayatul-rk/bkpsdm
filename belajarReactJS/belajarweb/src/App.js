import React from 'react';
import './App.css';
import Header from './halaman/Header';
import Footer from './halaman/Footer';


function App() {
  return (
    <div>
      <Header judul="Header 1" ket="Keterangan 1" />
      <Header judul="Header 2" />
      <Header judul="Header 3" ket="Keterangan 3" />
      <Header j="Judul" />

      <h1>Belajar React Hari Ke 2</h1>
      <Footer judul="Footer 1" ket="Keterangan 1" />
      <Footer judul="Footer 2" />
      <Footer judul="Footer 3" ket="Keterangan 3" />
    </div>
  );
}

export default App;
