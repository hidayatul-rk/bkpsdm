import React, { Component } from 'react';

class DaftarMakanan extends Component {
    constructor(props) {
        super(props)
        this.state = {
            menuMakanan: [
                {
                    nama: 'Mie Ayam',
                    harga: 20000
                },
                {
                    nama: 'Bakso Sapi',
                    harga: 30000
                },
                {
                    nama: 'sate',
                    harga: 40000
                }
            ]
        }
    }



    render() {
        return (
            <div>
                <h1>DAFTAR MAKANAN</h1>
                {this.state.menuMakanan.map((data, i) => {
                    // console.log(value)
                    // console.log(index)
                    return (
                        <div key={i}>
                            <p>No: {i + 1}</p>
                            <p>Nama Makanan : {data.nama}</p>
                            <p>Harga Makanan : {data.harga}</p>
                        </div>
                    )
                })}
            </div>
        )
    }
}
export default DaftarMakanan