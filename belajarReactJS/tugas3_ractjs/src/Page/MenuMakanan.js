import React, { Component } from 'react';
import ListMakanan from '../ListData/ListMakanan'

class MenuMakanan extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pesan: 0
        };
        this.rubahPesanan = this.rubahPesanan.bind(this);
        this.pesanan = this.pesanan.bind(this)
    }

    rubahPesanan() {
        var tambahPesanan = this.state.pesan + 1
        this.setState((state, props) => {
            return {
                pesan: tambahPesanan
            };
        })
    }

    pesanan(e) {
        console.log(e.target.value)
    }

    render() {
        return (
            <div>
                <h3>Daftar Makanan yang Kami Sediakan : </h3>
                <table>
                    <tbody>
                        <tr>
                            <td>
                                <ListMakanan gambarMakanan='https://s3-ap-southeast-1.amazonaws.com/niomic/img/sample/nasipadang.jpg' />
                                <center>
                                    <button onClick={this.rubahPesanan}>Pesan Sekarang </button>
                                </center>
                            </td>
                            <td>
                                <ListMakanan gambarMakanan='https://s3-ap-southeast-1.amazonaws.com/niomic/img/sample/sate.png' />
                                <center>
                                    <button onClick={this.rubahPesanan}>Pesan Sekarang </button>
                                </center>
                            </td>
                            <td>
                                <ListMakanan gambarMakanan='https://s3-ap-southeast-1.amazonaws.com/niomic/img/sample/sotolamongan.png' />
                                <center>
                                    <button onClick={this.rubahPesanan}>Pesan Sekarang </button>
                                </center>
                            </td>
                            <td>
                                <ListMakanan gambarMakanan='https://www.dbs.com/iwov-resources/images/newsroom/indonesia/Blog/masakan%20nusantara/nasi%20kentut.png' />
                                <center>
                                    <button onClick={this.rubahPesanan}>Pesan Sekarang </button>
                                </center>
                            </td>
                            <td>
                                <ListMakanan gambarMakanan='https://cdn.idntimes.com/content-images/post/20190311/qetringcom-f930b1d8edbd9793f1d0eef2fe1c6f1d.png' />
                                <center>
                                    <button onClick={this.rubahPesanan}>Pesan Sekarang </button>
                                </center>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <br />
                <input
                    type="text"
                    onChange={this.pesanan}
                />
                <h3>Pesanan Anda : {this.state.pesan}</h3>

            </div>
        )
    }

}

export default MenuMakanan;