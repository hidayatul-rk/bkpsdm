import React, {Component} from 'react';
// import Particles from "react-particles-js";
import TabAdmin from "../components/TabAdmin";
import CryptoJS from "crypto-js";
import Particles from "react-particles-js";
import {
    Col,
    Container,
    DropdownButton,
    FormCheck,
    FormControl,
    InputGroup,
    Nav,
    Navbar,
    Row,
    Table
} from "react-bootstrap";
import logoitb from "../img/logo-itb.png";
import Button from "react-bootstrap/Button";
import {FiSearch, FiSettings} from "react-icons/fi";
import logoppid from "../img/logo-ppid.png";
import {FaFacebook, FaInstagram, FaTwitter, FaWhatsapp, FaYoutube} from "react-icons/fa";
import logo100 from "../img/logo-100.png";

export default class AdminPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            'username': 'Guest',
            'rank': 'umum',
            'userDetails': sessionStorage.getItem('user')
        }

        var decrypted = '';
        if (this.state.userDetails != null) {
            decrypted = CryptoJS.enc.Utf8.stringify(CryptoJS.AES.decrypt(this.state.userDetails, "Secret Passphrase"));
            this.state.username = JSON.parse(decrypted).username;
            this.state.rank = JSON.parse(decrypted).rank;
        }
        // if (this.state.id === undefined) {
        //     window.location.href = "https://34.227.167.215/admin";
        // };
        // var self = this;

    }

    logout(e) {
        e.preventDefault();
        sessionStorage.removeItem('user');
        window.location.href = "https://login.itb.ac.id/cas/logout?service=https://34.227.167.215";

    }

    render() {
        return (
            <div className="admin">
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
                <div className="admin-content mt-5">
                    <Col className="mx-auto" lg="10">
                        <Row className="admin-content-child bg-light rounded shadow">
                            <TabAdmin/>
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
        );
    }
}