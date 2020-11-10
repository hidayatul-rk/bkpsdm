import React, { Component } from 'react';

class PageDua extends Component {
    constructor(props) {
        super(props)
        this.state = {
            statusHalaman: false
        }
        this.ubahState = this.ubahState.bind(this)
    }
    ubahState() {
        this.setState((state, props) => ({
            statusHalaman: !state.statusHalaman
        }))
    }


    render() {
        return (
            <div>
                {this.state.statusHalaman ? (
                    <div>
                        <h2>A. Page Kedua </h2>
                        <p>keternagan a. page kedua</p>
                    </div>
                ) : (
                        <div>
                            <h2>B. Page Kedua </h2>
                            <p>keternagan b. page kedua</p>
                        </div>
                    )}
                <button onClick={this.ubahState}>Ubah</button>
            </div>
        )
    }
}
export default PageDua