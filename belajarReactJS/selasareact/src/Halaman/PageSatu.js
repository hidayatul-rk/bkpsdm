import React, { Component } from 'react';
class PageSatu extends Component {
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
                        <h2>A. PageSatu </h2>
                        <p>keternagan a. page keSatu</p>
                    </div>
                ) : (
                        <div>
                            <h2>B. PageSatu </h2>
                            <p>keternagan b. page keSatu</p>
                        </div>
                    )}

                <button onClick={this.ubahState}>Ubah</button>
            </div>
        )
    }
}
export default PageSatu