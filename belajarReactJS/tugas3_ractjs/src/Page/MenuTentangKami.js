import React, { Component } from 'react';

class MenuTentangKami extends Component {
    constructor(props) {
        super(props)
        this.state = { tentangKami: 'Warung Nusantara Adalah Restoran Yang Bernuansa Makanan Nusantara, Kami Ada Untuk Membuat Anda Menikmati Makanan Khas Dari Nusantara' }
    }
    render() {
        return (
            <div>
                <h5>
                    <center>
                        <p>Tentang Kami</p> {this.state.tentangKami}
                    </center>
                </h5>
            </div>
        )
    }

}

export default MenuTentangKami;