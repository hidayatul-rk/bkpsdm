import React, { Component } from 'react';
import DaftarMakanan from '../Lib/DaftarMakanan';
import Header from './Header';

class MenuMakanan extends Component {
    render() {
        return (
            <div>
                <Header />
                <center>
                    <h3>DAFTAR MAKANAN FAVORITE</h3>
                </center>
                <table style={{ width: '100%' }}>
                    <tbody>
                        <tr>
                            {DaftarMakanan.map((data, i) => {
                                return (
                                    <td key={i}>
                                        <center>
                                            <img src={data.img} alt="Product Makanan" width="150" height="100" />

                                            <p>
                                                {data.NamaMakanan}
                                            </p>
                                            <p>
                                                Harga : Rp. {data.harga}
                                            </p>
                                        </center>
                                    </td>
                                )
                            })}
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}

export default MenuMakanan