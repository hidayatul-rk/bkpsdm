import React from 'react';
// import React, { Component } from 'react';

class Footer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            namaBuku: "IPS",
            alamat: "Karawamg",
            nomorTelp: 11223344,
            contohProps: props.ket
        }
    }
    // untuk "state" hanya bisa digunakan di class

    render() {
        return (
            <div>
                <h2>=====BATAS=====</h2>
                <h3>{this.props.judul}</h3>
                <p>{this.props.ket}</p>
                <h5>{this.state.namaBuku}</h5>
                <h5>{this.state.alamat}</h5>
                <h5>{this.state.nomorTelp}</h5>
                <h5>{this.state.contohProps}</h5>
            </div>
        )
    }
}

// class Footer extends Component{
//     render(){
//         return(
//             <h2>Membuat Class Dengan Componen</h2>
//         )
//     }
// }

export default Footer;