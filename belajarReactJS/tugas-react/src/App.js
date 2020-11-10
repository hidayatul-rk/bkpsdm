import React, { Component } from 'react';
import './App.css';
import Kontak from './Page/MenuKontak';
import Product from './Page/MenuProduct';
import Tentang from './Page/MenuTentangKami';
import Utama from './Page/MenuUtama';
// import Tentang from './Page/MenuTentangKami';

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <Utama />
        <Kontak />
        <Tentang />
        <Product />
        <Footer />
      </div>
    )
  }
}

export function Header() {
  return (
    <h2>Ini Halaman Utama Header</h2>
  )
}
export function Footer() {
  return (
    <h2>Ini Dari Utama Footer</h2>
  )
}

export default App;
