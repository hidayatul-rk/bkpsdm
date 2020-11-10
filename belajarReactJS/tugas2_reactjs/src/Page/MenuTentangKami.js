import React, { Component } from 'react';

class MenuTentangKami extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            tentang: "Warung Nusantara Adalah Restoran Yang Bernuasa Makanan Nusantara, Kami ada untuk Membuat Anda Menikmati Makanan Khas Dari Nusantara"
        }
    }
    render() {
        return (
            <div>
                <center>
                    <p>Tentang Kami</p> {this.state.tentang}
                </center>
            </div>
        )
    }
}

export default MenuTentangKami;