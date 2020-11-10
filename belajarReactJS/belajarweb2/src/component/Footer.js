import React, { Component } from 'react'

class Footer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            pesanDariState: "Pesan Dari State Awal"
        }
        this.ubahDataState = this.ubahDataState.bind(this)
    }

    ubahDataState(e) {
        e.preventDefault()
        // perintah untuk merubah value/data/isi yg berada didalam state
        this.setState({ pesanDariState: "Data Akan Berubah" })
    }

    render() {
        return (
            <div>

                <p>{this.props.pesanDariProps}</p>
                <p>{this.state.pesanDariState}</p>
                <button href="/" onClick={(e) => this.ubahDataState(e)} >Ubah Data</button>
            </div>
        )
    }
}

export default Footer;