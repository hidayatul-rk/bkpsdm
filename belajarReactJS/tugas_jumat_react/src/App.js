import React from 'react';
import './App.css';

import Header from './Pages/Header';
import Top from './Pages/Top';
import Bot from './Pages/Bot'
import Footer from './Pages/Footer'



function App() {
  return (
    <div>
      <Header j="Tugas React Js - Hari Jumat" />
      <Top />
      <br />

      <Bot pesan2="Coba Alert, silakan diklik" />
      <br />

      <a class="text-primary">
        <Footer judul="Tugas ReactJS" ket="Testlah" />
      </a>

    </div>
  );
}

export default App;
