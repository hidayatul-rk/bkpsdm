import React, { Component } from 'react';

class Registrasi extends Component {
  constructor(props){
    super(props)
    this.state = {
      valueFirstName: '',
      valueLastName: '',
      valueAlamat: '',
      valueKodePost: ''
    }
    this.ubahState = this.ubahState.bind(this)
  }

  ubahState(namaValue, e){
    e.preventDefault()

    //Perubahan state secara reguler
    // this.setState({[namaValue]: e.target.value})


    // perubahan state secara Asynchronous
    var tampungData = e.target.value
    this.setState(function(state, props){
      return {
        [namaValue]: tampungData
      }
    });

  }


  render(){
    return(
      <div>
        <h5>Contoh 1 </h5>
        <p>{this.state.valueFirstName}</p>
        <input value={this.state.valueFirstName} onChange={(e)=>this.ubahState("valueFirstName", e)}/>
        <h5>==================</h5>

        <h5>Contoh 2 </h5>
        <p>{this.state.valueLastName}</p>
        <input value={this.state.valueLastName} onChange={(e)=>this.ubahState("valueLastName", e)}/>
        <h5>==================</h5>

        <h5>Contoh 3 </h5>
        <p>{this.state.valueAlamat}</p>
        <input value={this.state.valueAlamat} onChange={(e)=>this.ubahState("valueAlamat", e)}/>
        <h5>==================</h5>

        <h5>Contoh 4 </h5>
        <p>{this.state.valueKodePost}</p>
        <input value={this.state.valueKodePost} onChange={(e)=>this.ubahState("valueKodePost", e)}/>
      </div>
    )
  }
}

export default Registrasi
