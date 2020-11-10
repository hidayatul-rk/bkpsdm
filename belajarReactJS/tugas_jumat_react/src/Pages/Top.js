import React, { Component } from 'react'

class Top extends Component {
	constructor(props) {
		super(props);
		this.state = {
			text: "HIDAYATUL RAHMAN KASUMA"
		}

	}
	ubahText(e) {
		e.preventDefault()
		this.setState({ text: "BKPSDM Kabupaten Karawang" })
	}

	render() {
		return (
			<div>
				<center>
					<a class="text-primary">{this.state.text}</a><br />
					<button type="button" class="btn btn-primary" onClick={(e) => this.ubahText(e)}>Ubah Text</button>
				</center>
			</div>
		)
	}
}

export default Top;