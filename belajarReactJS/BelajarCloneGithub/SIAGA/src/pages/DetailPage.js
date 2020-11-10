import React, {Component} from 'react';
import Particles from "react-particles-js";
import {
    Col,
    Container,
    DropdownButton,
    Form,
    FormCheck,
    FormControl,
    FormGroup,
    FormLabel,
    InputGroup,
    Modal,
    Nav,
    Navbar,
    ResponsiveEmbed,
    Row,
    Table
} from "react-bootstrap";
import logoitb from "../img/logo-itb.png";
import logoppid from "../img/logo-ppid.png";
import logo100 from "../img/logo-100.png";
import Button from "react-bootstrap/Button";
import {FiSearch, FiSettings} from "react-icons/fi";
import {FaFacebook, FaInstagram, FaTwitter, FaWhatsapp, FaYoutube} from "react-icons/fa";
import CryptoJS from 'crypto-js';

const qs = require('query-string');

var bonsai_url = "https://f6CbqkpuHw:CEHybx3Y2vTfsgGzo8Sw@sans-itb-7152476607.ap-southeast-2.bonsaisearch.net:443";
var elasticsearch = require('elasticsearch');
var client = new elasticsearch.Client({
    host: bonsai_url,
    log: 'trace'
});

client.ping({
    // ping usually has a 3000ms timeout
    requestTimeout: 1000
}, function (error) {
    if (error) {
        console.trace('elasticsearch cluster is down!');
    } else {
        console.log('All is well');
    }
});

const arrayFields = ['klasifikasi_arsip']

export default class DetailPage extends Component {

    constructor(props) {
        super(props);
        this.handleShow = this.handleShow.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleNewFieldChange = this.handleNewFieldChange.bind(this);
        this.handleAddField = this.handleAddField.bind(this);
        this.handleDeleteField = this.handleDeleteField.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);

        let params = qs.parse(this.props.location.search);
        console.log(params);

        this.state = {
            'username': 'Guest',
            'rank': 'umum',
            'userDetails': sessionStorage.getItem('user'),
            show: false,
            newField: '',
            id: '',
            params: params,
            detail: [["LOADING", "LOADING"]],
            newDetail: [],
            hiddenFields: ['image_URL', 'media_URL']
        };

        var decrypted = '';
        if (this.state.userDetails != null) {
            decrypted = CryptoJS.enc.Utf8.stringify(CryptoJS.AES.decrypt(this.state.userDetails, "Secret Passphrase"));
            this.state.username = JSON.parse(decrypted).username;
            this.state.rank = JSON.parse(decrypted).rank;
        }

        if (params.id === undefined) {
            window.location.href = "../";
        }
        ;
        this.state.id = params.id
        var self = this;
        client.get({
            index: 'arsip',
            id: params.id
        })
            .then(function (res) {
                self.setState({params: res._source})
                console.log(res)
                let details = res._source
                if (details != null) {
                    let result = []
                    for (var i in details)
                        result.push([i, details[i]]);
                    self.setState({detail: result, newDetail: result});
                } else {
                    window.location.href = "../";
                }
            }, function (err) {
                console.log(err)
            })
    }

    handleShow() {
        if (this.state.show === false) {
            var newDetail = this.state.detail
            this.setState({show: true, newDetail: newDetail});
        }
        console.log("show modal");
    }

    handleClose() {
        this.setState({show: false});
        console.log("hide modal");
    }

    handleChange(event) {
        const target = event.target;
        const name = target.name;
        var value = target.value;
        const id = target.id;

        if (arrayFields.includes(name)) {
            value = value.split(',');
            var x;
            for (x in value) {
                value[x] = value[x].trim()
            }
        }

        var newDetail = this.state.newDetail
        newDetail[id] = [name, value]
        this.setState({newDetail: newDetail})
    }

    handleNewFieldChange(event) {
        const target = event.target;
        const value = target.value;

        this.setState({newField: value})
    }

    handleAddField(event) {
        var newDetail = this.state.newDetail
        if (this.state.newField !== '') {
            newDetail.push([this.state.newField, '']);
        }
        this.setState({newDetail: newDetail, newField: ''})
    }

    handleDeleteField(event) {
        const target = event.target;
        const name = target.name;
        var newDetail = this.state.newDetail;
        newDetail.splice(name, 1);
        this.setState({newDetail: newDetail})
    }

    async handleSubmit() {
        this.setState({show: false});
        var newDetail = this.state.newDetail;
        var newDetailJSON = {};
        var x;
        for (x in newDetail) {
            newDetailJSON[newDetail[x][0]] = newDetail[x][1]
        }
        // console.log(newDetailJSON)
        var self = this;
        await client.index({
            index: 'arsip',
            id: self.state.id,
            body: newDetailJSON
        })
        console.log("submit");
        window.location.reload();
    }

    async handleDelete() {
        this.setState({show: false});
        var self = this;
        client.delete({
            index: 'arsip',
            id: self.state.id
        }, function (err, resp, status) {
            console.log(err);
            console.log(resp);
            window.location.href = "../";
        });
        console.log("delete");
    }

    logout(e) {
        e.preventDefault();
        sessionStorage.removeItem('user');
        window.location.href = "https://login.itb.ac.id/cas/logout?service=https://34.227.167.215";

    }

    render() {

        return (
            <div className="detail">
                <Particles className="detail-background" canvasClassName="particle-canvas" params={{
                    "particles": {
                        "number": {
                            "value": 100
                        },
                        "size": {
                            "value": 5
                        },
                        "line_linked": {
                            "width": {
                                "value": 2
                            }
                        },
                        "move": {
                            "speed": 3,
                            "direction": "top",
                            "out_mode": "out"
                        }
                    }

                }}/>
                <Navbar expand="lg" className="common-navbar" bg="none" sticky="top">
                    <Navbar.Brand href="https://34.227.167.215">
                        <img
                            alt=""
                            src={logoitb}
                            width="45"
                            height="45"
                            className="d-inline-block align-top mr-3"
                        />
                        Sistem Informasi Arsip Digital Statis ITB
                    </Navbar.Brand>

                    <Col xs>
                        <InputGroup>
                            <DropdownButton
                                as={InputGroup.Prepend}
                                title="Filter"
                                id="navbar-filter"
                                variant="light"
                            >
                                <FormCheck
                                    type="checkbox"
                                    id="tipe-gambar"
                                    label="Gambar"
                                    className="ml-3"
                                />
                                <FormCheck
                                    type="checkbox"
                                    id="tipe-tekstual"
                                    label="Tekstual"
                                    className="ml-3"
                                />
                                <FormCheck
                                    type="checkbox"
                                    id="tipe-audio"
                                    label="Audio"
                                    className="ml-3"
                                />
                                <FormCheck
                                    type="checkbox"
                                    id="tipe-video"
                                    label="Video"
                                    className="ml-3"
                                />
                                <FormCheck
                                    type="checkbox"
                                    id="tipe-lainnya"
                                    label="Lainnya"
                                    className="ml-3"
                                />
                            </DropdownButton>

                            <FormControl/>
                            <InputGroup.Append>
                                <Button variant="light"><FiSearch style={{verticalAlign: 'baseline'}}/></Button>
                            </InputGroup.Append>
                        </InputGroup>
                    </Col>

                    <Nav className="ml-auto">
                        {this.state.rank != 'umum' ?
                            <Button className="mr-2" variant="light" href="../admin"><FiSettings
                                style={{verticalAlign: 'baseline'}}/></Button> : null}
                        {this.state.username === 'Guest' ? <Button variant="outline-light"
                                                                   href="https://login.itb.ac.id/cas/login?service=https://34.227.167.215">Masuk</Button> :
                            <Button variant="outline-light" onClick={this.logout} >Keluar</Button>}
                    </Nav>
                </Navbar>
                <div className="detail-content mt-5">

                    {/* Edit arsip modal */}
                    <Modal show={this.state.show} onHide={this.handleClose} size="xl">
                        <Modal.Header closeButton>
                            <Modal.Title>Ubah Data Arsip</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form id="formArsip">
                                {this.state.newDetail.map(
                                    (content, index) => (
                                        <FormGroup as={Row} className="mx-auto">
                                            <FormLabel column sm="4">{content[0]} : </FormLabel>
                                            <Col sm="7">
                                                <FormControl
                                                    id={index}
                                                    name={content[0]}
                                                    type="text"
                                                    value={content[1]}
                                                    onChange={this.handleChange}/>
                                            </Col>
                                            <Button variant="danger" name={index} onClick={this.handleDeleteField}>
                                                Delete
                                            </Button>
                                        </FormGroup>
                                    )
                                )}
                            </Form>
                        </Modal.Body>
                        <Modal.Footer>
                            <FormGroup as={Row} className="mx-auto">
                                <Col sm="5">
                                <FormControl
                                    id="newField"
                                    name="newField"
                                    type="text"
                                    value={this.state.newField}
                                    onChange={this.handleNewFieldChange}/>
                                </Col>
                                <Button variant="primary" onClick={this.handleAddField}>
                                    Add Field
                                </Button>
                            </FormGroup>
                            <Button variant="secondary" onClick={this.handleClose}>
                                Close
                            </Button>
                            <Button variant="primary" onClick={this.handleSubmit}>
                                Confirm
                            </Button>
                            <Button variant="danger" onClick={this.handleDelete}>
                                Delete
                            </Button>
                        </Modal.Footer>
                    </Modal>

                    <Col className="mx-auto" lg="10">
                        <Row className="p-5 bg-light rounded shadow">
                            <ResponsiveEmbed aspectRatio="16by9">
                                <iframe className="w-100" src={this.state.params.media_URL}
                                        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen>
                                </iframe>
                            </ResponsiveEmbed>
                        </Row>
                        <Row className="p-5 mt-3 bg-light rounded shadow justify-content-between">
                            <h2 className="mb-4">{this.state.params.title}</h2>
                            <Table bordered responsive size="lg">
                                {this.state.detail.map((data) => (
                                    <tr>
                                        {this.state.hiddenFields.includes(data[0]) ? null :
                                            data.map((information) => (
                                                <td>{information}</td>
                                            ))}
                                    </tr>
                                ))}
                            </Table>
                            <Button href={this.state.params.media_URL}>Unduh Arsip</Button>
                            { this.state.rank != 'umum' ? 
                            <Button onClick={this.handleShow}>Ubah Data Arsip</Button> 
                            : null}
                        </Row>
                    </Col>


                </div>
                <footer className="bg-dark text-light mt-5">
                    <Container>
                        <Row className="align-items-center">
                            <Col md="1">
                                <img
                                    alt=""
                                    src={logoppid}
                                    height="50"
                                    className="logo-footer"
                                />
                            </Col>
                            <Col md="4">
                                <h5>PPID Institut Teknologi Bandung</h5>
                                <small>Pusat Informasi Kampus (Information Center) ITB</small>
                                <br/>
                                <small>Jalan Ganesha No. 10, Bandung, Jawa Barat, Indonesia.</small>
                                <br/>
                                <small><b>Telp.</b> +62-22-2504252 | <b>Fax.</b> +62-22-2504252</small>
                                <br/>
                                <small><b>Email.</b> ppid@itb.ac.id</small>
                            </Col>
                            <Col md="5">
                                <small><a><b>Media sosial:</b></a></small><br/>
                                <Table size="sm" borderless>
                                    <tbody>
                                    <tr>
                                        <td className="contact">
                                            <a href="https://twitter.com/PPID_ITB" target="_blank"
                                               data-url="https://twitter.com/PPID_ITB"
                                               data-homelink="https://twitter.com">
                                                <FaTwitter size="2em" style={{verticalAlign: 'bottom'}}/>{'  '}
                                                @PPID_ITB</a>
                                        </td>
                                        <td className="contact"><a href="https://www.instagram.com/ppid.itb/?hl=en"
                                                                   target="_blank"
                                                                   data-url="https://www.instagram.com/ppid.itb/?hl=en"
                                                                   data-homelink="https://instagram.com">
                                            <FaInstagram size="2em" style={{verticalAlign: 'bottom'}}/>{'  '}
                                            @ppid.itb</a>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="contact">
                                            <a href="https://www.facebook.com/PPID.ITB.Bandung/" target="_blank">
                                                <FaFacebook size="2em" style={{verticalAlign: 'bottom'}}/>{'  '}
                                                @PPID.ITB.Bandung</a>
                                        </td>
                                        <td className="contact">
                                            <a href="https://www.youtube.com/channel/UCxlYLLsK5YdsrGCtVBU3kYQ"
                                               target="_blank">
                                                <FaYoutube size="2em" style={{verticalAlign: 'bottom'}}/>{'  '}
                                                PPID ITB</a>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="contact">
                                            <a href="https://api.whatsapp.com/send?phone=+6281290401959"
                                               target="_blank">
                                                <FaWhatsapp size="2em" style={{verticalAlign: 'bottom'}}/>{'  '}
                                                +62-812-9040-1959</a>
                                        </td>
                                    </tr>
                                    </tbody>
                                </Table>
                            </Col>
                            <Col md="2" className="text-md-right">
                                <a href="http://seabaditb.id/" target="_blank">
                                    <img
                                        className="logo-100-footer"
                                        src={logo100}
                                        alt=""/>
                                </a>
                            </Col>
                        </Row>
                    </Container>
                </footer>
            </div>
        )
            ;
    }
}