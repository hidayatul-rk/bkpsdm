import React from 'react';
import './App.css';
import Header from './Page/Header';
import Footer from './Page/Footer';
import MenuTentangKami from './Page/MenuTentangKami'
import MenuKontak from './Page/MenuKontak';
import MenuMakanan from './Page/MenuMakanan';
import MenuUtama from './Page/MenuUtama';

function App() {
  return (
    <div>
      <Header />
      <MenuUtama />
      <MenuMakanan />
      <MenuTentangKami />
      <MenuKontak />
      <Footer />
    </div>


  );
}

export default App;
