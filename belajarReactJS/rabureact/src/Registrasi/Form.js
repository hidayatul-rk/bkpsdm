import React, { Component } from 'react';

class Form extends Component {
    constructor(props) {
        super(props)
        this.state = {
            namaDepan: '',
            namaBelakang: '',
            email: '',
            password: ''

        }
        this.handleInput = this.handleInput.bind(this)
        this.kirimData = this.kirimData.bind(this)
    }

    handleInput(value, e) {
        e.preventDefault()
        this.setState({ [value]: e.target.value })
        // var temp = e.target.value
        // this.setState(function (state, props) {
        //     return {
        //         [value]: temp
        //     }
        // })
    }


    kirimData(e) {
        e.preventDefault()
        alert("Nama Depan :" + this.state.namaDepan)
        alert("Nama Belakang :" + this.state.namaBelakang)
        alert("Email :" + this.state.email)
        alert("Password :" + this.state.password)
        // this.setState({
        //     namaDepan: '',
        //     namaBelakang: '',
        //     email: '',
        //     password: ''
        // })

    }


    render() {
        return (
            <div>
                <h1>DAFTAR</h1>
                <form onSubmit={this.kirimData}>
                    <p>Nama Depan</p>
                    <input type="text" value={this.state.namaDepan} onChange={(e) => this.handleInput("namaDepan", e)} />
                    <p>Nama Belakang</p>
                    <input type="text" value={this.state.namaBelakang} onChange={(e) => this.handleInput("namaBelakang", e)} />
                    <p>Email</p>
                    <input type="email" value={this.state.email} onChange={(e) => this.handleInput("email", e)} />
                    <p>Password</p>
                    <input type="password" value={this.state.password} onChange={(e) => this.handleInput("password", e)} />
                    <br />
                    <input type="submit" value="Daftar" />
                </form>
            </div>
        )
    }
}
export default Form