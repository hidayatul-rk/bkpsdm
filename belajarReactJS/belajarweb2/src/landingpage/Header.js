import React, { Component } from 'react'

class Header extends Component {
    constructor(props) {
        super(props)
        this.state = {
            pesan1: "Ini Pesan dari State"
        }

        this.handlePesanHeader = this.handlePesanHeader.bind(this);
        this.pesan1 = this.pesan1.bind(this);
    }
    // alert menggunakan parameter, fungsi "e" untuk tidak auto refresh
    handlePesanHeader(valuek1, ke2, e) {
        e.preventDefault()

        // alert('Pesan Dari Header')
        alert(valuek1)
        alert(ke2)

    }
    pesan1() {
        alert(this.state.pesan1)
    }

    render() {
        return (
            <div>
                <a href="/" onClick={this.handlePesanHeader}>Klik Header</a>
                <br /><a href="/" onClick={this.pesan1}>PesanKita</a>
                <br /><a href="/" onClick={(e) => this.handlePesanHeader("Dari Render Kelas", "Pesan ke2", e)}>Pesan DAri Render</a>
            </div>
        )
    }
}

export default Header