import React from 'react';
import './App.css';
import Header from './Page/Header';
import Footer from './Page/Footer';
import MenuUtama from './Page/MenuUtama';
import MenuTentangKami from './Page/MenuTentangKami';
import MenuKontak from './Page/MenuKontak';
import MenuMakanan from './Page/MenuMakanan';

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
