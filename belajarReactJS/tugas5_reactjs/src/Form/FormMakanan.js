import React, { Component } from 'react';

class FormMakanan extends Component {
    constructor(props) {
        super(props);
        this.state =
        {
            pesanan: '',
            jumlah: ''
        }

        this.hendleChange = this.hendleChange.bind(this);
        this.hendleChangeJumlah = this.hendleChangeJumlah.bind(this);
        this.hendleSubmit = this.hendleSubmit.bind(this);
        this.pesanan = React.createRef();

    }

    hendleChange(e) {
        this.setState({ pesanan: e.target.value });
    }

    hendleChangeJumlah(e) {
        this.setState({ jumlah: e.target.value });
    }

    hendleSubmit(e) {
        e.preventDefault();
        alert
            (
                "Pesanan Anda Adalah : " + this.state.pesanan +
                " | Jumlah Pesanan : " + this.state.jumlah
            );

        this.setState
            ({
                pesanan: "",
                jumlah: ""
            });
        this.pesanan.current.focus()
    }
    render() {
        return (
            <div>
                <center>
                    <form onSubmit={this.hendleSubmit}>

                        <input onChange={this.hendleChange} type="text" value={this.state.pesanan} ref={this.pesanan} placeholder="Masukan Pesanan Anda" />
                        <input onChange={this.hendleChangeJumlah} type="number" value={this.state.jumlah} placeholder="Masukan Jumlah Pesanan" />
                        <br />
                        <br />
                        <input type="submit" value="Pesan" />
                    </form>
                </center>
            </div>
        )
    }
}
export default FormMakanan