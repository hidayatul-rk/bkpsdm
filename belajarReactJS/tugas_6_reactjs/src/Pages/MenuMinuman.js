import React, { Component } from 'react';
import DaftarMinuman from '../Lib/DaftarMinuman';
import Header from './Header';

class MenuMinuman extends Component {

    render() {
        return (
            <div>
                <Header />
                <center>
                    <h3>DAFTAR MINUMAN FAVORITE</h3>
                </center>
                <table style={{ width: '100%' }}>
                    <tbody>
                        <tr>
                            {DaftarMinuman.map((data, i) => {
                                return (
                                    <td key={i}>
                                        <center>
                                            <img src={data.img} alt="Product Minuman" width="150" height="100" />

                                            <p>
                                                {data.nama}
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

export default MenuMinuman