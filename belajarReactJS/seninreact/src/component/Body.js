import React, { Component } from 'react';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import ModalPage from './ModalPage';

class Body extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dataGambar: [],
            valueSearch: '',
            inputNama: '',
            inputLink: '',
            inputKet: '',
            inputId: ''
        }
        this.panggilSemua = this.panggilSemua.bind(this)
        this.search = this.search.bind(this)
        this.hapusData = this.hapusData.bind(this)
        this.closeModal = this.closeModal.bind(this)
        this.handleInput = this.handleInput.bind(this)
        this.clearInput = this.clearInput.bind(this)
        this.simpanData = this.simpanData.bind(this)
        this.panggilById = this.panggilById.bind(this)
    }

    panggilById(id) {
        fetch(`http://localhost:3000/pustakagambar/${id}`)
            .then((response) => response.json())
            .then((hasil) => {
                this.props.setModalShow(true)
                this.setState(
                    {
                        inputNama: hasil.nama,
                        inputLink: hasil.linkgambar,
                        inputKet: hasil.ket,
                        inputId: hasil.id
                    }
                )
            })

    }


    simpanData() {
        if (this.state.inputNama === '' || this.state.inputLink === '' || this.state.inputKet === '') {
            alert('Silahkan Isi Data Terlebih Dahulu')
        } else if (this.state.inputId === '') {
            fetch('http://localhost:3000/pustakagambar', {
                method: 'POST',
                body: JSON.stringify({
                    nama: this.state.inputNama,
                    linkgambar: this.state.inputLink,
                    ket: this.state.inputKet
                }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                }
            })
                .then((response) => response.json())
                .then((result) => {
                    console.log(result)
                    this.closeModal()
                    this.panggilSemua()
                })
        } else {
            fetch(`http://localhost:3000/pustakagambar/${this.state.inputId}`, {
                method: 'PUT',
                body: JSON.stringify({
                    nama: this.state.inputNama,
                    linkgambar: this.state.inputLink,
                    ket: this.state.inputKet
                }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            })
                .then((response) => response.json())
                .then((hasil) => {
                    this.panggilSemua()
                    this.props.setModalShow(false)
                    this.clearInput()
                })

        }
    }

    handleInput(value, e) {
        this.setState({ [value]: e.target.value })
    }

    closeModal() {
        this.props.setModalShow(false)
        this.clearInput()
    }

    clearInput() {
        this.setState(
            {
                inputNama: '',
                inputLink: '',
                inputKet: '',
                inputId: ''
            }
        )
    }

    hapusData(id) {
        fetch(`http://localhost:3000/pustakagambar/${id}`, {
            method: 'DELETE',
        }).then((response => {
            alert('Data Sudah Terhapus')
            this.panggilSemua()
        }))
    }

    search(e) {
        this.setState({ valueSearch: e.target.value })
    }

    panggilSemua() {
        fetch('http://localhost:3000/pustakagambar')
            .then((response) => response.json())
            .then((hasil) => this.setState({ dataGambar: hasil }))
    }

    componentDidMount() {
        this.panggilSemua()
    }

    render() {
        return (
            <Container>
                <ModalPage modalShow={this.props.modalShow} setModalShow={this.props.setModalShow} closeModal={this.closeModal} handleInput={this.handleInput} dataState={this.state} simpanData={this.simpanData} panggilById={this.panggilById} />
                <Row style={{ marginTop: '30px' }}>
                    <Col lg={10}>
                        <Form.Control type='text' placeholder="Cari Gambar" value={this.state.valueSearch} onChange={(e) => this.search(e)} />
                    </Col>
                    <Col lg={2}>
                        <Button onClick={() => this.props.setModalShow(true)} variant='primary'>Tambah Data</Button>
                    </Col>
                </Row>
                <Row>
                    {
                        this.state.dataGambar.reverse().filter(valueFilter => valueFilter.nama.toLowerCase().includes(this.state.valueSearch)).map((value, index) => {
                            return (
                                <Card style={{ width: '200px', marginTop: '30px', marginLeft: '20px' }} key={index}>
                                    <Card.Img varian='top' src={value.linkgambar} />
                                    <Card.Body>
                                        <Card.Title>{value.nama}</Card.Title>
                                        <Card.Text>{value.ket}</Card.Text>
                                    </Card.Body>
                                    <Card.Footer>
                                        <Button onClick={() => this.hapusData(value.id)} style={{ marginRight: '5%' }} variant='outline-danger'>Hapus</Button>
                                        <Button onClick={() => this.panggilById(value.id)} variant='outline-primary'>Edit</Button>
                                    </Card.Footer>
                                </Card>

                            )
                        })
                    }
                </Row>
            </Container>
        )
    }
}

export default Body