import React, { Component } from 'react';

class Registrasi extends Component {
    constructor(props) {
        super(props)
        this.state = {
            judul: 'Contoh Judul',
            contohPerubahan: 'Judul yg Akan diUbah',
            valueInput: '',
            valueInput2: '',
            valueInput3: '',
            valueInput4: ''

        }
        this.ubahState = this.ubahState.bind(this)

    }
    ubahState(namaValue, e) {
        e.preventDefault()
        // cara perubahan state reguler
        // this.setState({ [namaValue]: e.target.value })

        // caraperubahan state secara asynchronous
        var tampungData = e.target.value
        this.setState(function (state, props) {
            return {
                [namaValue]: tampungData
            }
        });

        // this.setState((state, props) => ({
        //     judul: 'Ubah Melalui Input'
        // }))
        // Perubahan State secara reguler
        // this.setState({ judul: 'Merubah Judul Secara Reguler' })


        // Perubahan State secara Asynchronous dengan cara arrow function
        // this.setState({ judul: 'Merubah Judul Secara Reguler' })



        // Perubahan State secara Asynchronous ditulis dengan cara arrow function
        // this.setState((state, props) => ({
        //     judul: 'Merubah Ke2'
        // }))

        // Perubahan State secara Asynchronous ditulis dengan cara reguler function
        // this.setState((state, props) => ({
        //     judul: state.contohPerubahan
        // }))

    }

    render() {
        return (
            <div>
                {/* <h2>{this.state.judul}</h2> */}
                <h5>Contoh 1</h5>
                {
                    // <button onClick={(e) => this.ubahState(e)}>Klik Untuk Berubah</button>
                }
                <p>{this.state.valueInput}</p>
                <input value={this.state.valueInput} onChange={(e) => this.ubahState("valueInput", e)} />
                <h5>===================</h5>

                <h5>Contoh 2</h5>
                <p>{this.state.valueInput2}</p>
                <input value={this.state.valueInput2} onChange={(e) => this.ubahState("valueInput2", e)} />
                <h5>===================</h5>

                <h5>Contoh 3</h5>
                <p>{this.state.valueInput3}</p>
                <input value={this.state.valueInput3} onChange={(e) => this.ubahState("valueInput3", e)} />
                <h5>===================</h5>

                <h5>Contoh 4</h5>
                <p>{this.state.valueInput4}</p>
                <input value={this.state.valueInput4} onChange={(e) => this.ubahState("valueInput4", e)} />
                <h5>===================</h5>
            </div>
        )
    }
}

export default Registrasi