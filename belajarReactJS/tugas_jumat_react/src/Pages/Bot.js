import React, { Component } from 'react';

class Bot extends Component {

    constructor(props) {
        super(props)
        this.state = {
            pesanKhusus: 'pesan 1'
        }
        this.handlePesanKhusus = this.handlePesanKhusus.bind(this);
    }

    handlePesanKhusus(valueke1, ke2, e) {
        e.preventDefault()
        alert(this.state.pesanKhusus)
        alert(valueke1)
        alert(ke2)
    }

    render() {
        return (
            <div>
                <center>
                    <p class="text-success">{this.props.pesan2}</p>
                    <a href="/" onClick={(e) => this.handlePesanKhusus("Alert1", "Alert2", e)}>Klik di Sini</a>
                </center>
            </div>
        )
    }
}
export default Bot;
