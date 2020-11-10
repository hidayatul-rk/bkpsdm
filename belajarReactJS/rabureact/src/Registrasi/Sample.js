import React, { Component } from 'react';

class Sample extends Component {

    constructor(props) {
        super(props)
        this.state = {
            valueInput: ''
        }
        this.handleInput = this.handleInput.bind(this)
        this.kirimData = this.kirimData.bind(this)
        this.otomatisPointer = React.createRef();
    }
    handleInput(e) {
        this.setState({ valueInput: e.target.value })
    }

    kirimData(e) {
        e.preventDefault()
        alert("Pesannya :" + this.state.valueInput)
        this.setState({ valueInput: '' })

        this.otomatisPointer.current.focus()
    }

    render() {
        return (
            <div>
                <h2>Halaman Sample</h2>
                <form onSubmit={this.kirimData}>
                    <input type="text" value={this.state.valueInput} onChange={this.handleInput} ref={this.otomatisPointer} />
                    <input type="submit" value="Submit Data" />
                </form>
            </div>
        )
    }
}

export default Sample