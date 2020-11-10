import React, { Component } from 'react';
// import MenuTentangKami from './MenuTentangKami';

class MenuKontak extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            alamat: "Jl. Swadaya IV, Pd. Ranggon Cipayung, Jakarta Timur DKI 13860",
            kontak: '081311223344'

        }
    }
    render() {
        return (
            <div>
                <center>
                    <h3>{this.state.alamat}</h3>
                    <h4>Kontak Kami : {this.state.kontak}</h4>
                </center>
            </div>
        )
    }
}

export default MenuKontak;