import React, { Component } from 'react';

const menuminuman = [
    {
        nama: 'es teh',
        harga: 5000
    },
    {
        nama: 'teh hangat',
        harga: 7000
    },
    {
        nama: 'es jeruk',
        harga: 8000
    }
]

class DaftarMinuman extends Component {
    constructor(props) {
        super(props)
        this.state = {
            menuDrink: [
                {
                    nama: 'Aqua Botol',
                    Harga: 10000
                },
                {
                    nama: 'Coca-Cola',
                    Harga: 15000
                },
                {
                    nama: 'Teh Botol',
                    Harga: 20000
                }
            ]
        }
    }
    render() {
        return (
            <div>
                <h1>Daftar Minuman dari Ekternal</h1>

                {this.state.menuDrink.map((data, i) => {
                    return (
                        <div key={i} >
                            <p>No : {i + 1}</p>
                            <p>Nama Minuman : {data.nama}</p>
                            <p>Harga : {data.Harga}</p>
                        </div>
                    )
                })}
                <h1>Daftar Makanan Dari Props</h1>
                {this.props.menuMinuman.map((data, i) => {
                    return (
                        <div key={i}>
                            <p>No. {i + 1}</p>
                            <p>Nama Minuman : {data.nama}</p>
                            <p>Harga : {data.harga}</p>
                        </div>
                    )
                })}

                <h1>Daftar Makanan Dari Variable</h1>
                {menuminuman.map((data, i) => {
                    return (
                        <div key={i}>
                            <p>no. {i + 1}</p>
                            <p>nama minuman : {data.nama}</p>
                            <p>harga : {data.harga}</p>
                        </div>
                    )
                })}
                {/* <h1>Daftar Makanan Dari Ekternal</h1> */}

            </div >
        )
    }
}
export default DaftarMinuman