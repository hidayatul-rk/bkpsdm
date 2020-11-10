import React from 'react';
import './App.css';
import Header from './landingpage/Header';
import Top from './landingpage/Top'
import Footer from './component/Footer';

function App() {
  return (
    <div>
      <Header />
      <Top />
      <h1>Belajar React Di Hari Jumat</h1>
      <Footer pesanDariProps="pesan Dari Props" />
    </div>
  );
}

export default App;
