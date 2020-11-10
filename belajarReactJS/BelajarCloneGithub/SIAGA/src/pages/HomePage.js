import React, {Component} from 'react';
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
    Table,
    Form
} from "react-bootstrap";
import logoitb from "../img/logo-itb.png";
import logoppid from "../img/logo-ppid.png";
import logo100 from "../img/logo-100.png";
import Button from "react-bootstrap/Button";
import {FiSearch, FiSettings} from "react-icons/fi";
import {FaFacebook, FaInstagram, FaTwitter, FaWhatsapp, FaYoutube} from "react-icons/fa";
import Typewriter from "typewriter-effect";
import queryString from 'query-string';
import axios from 'axios';
import CryptoJS from 'crypto-js';
var bonsai_url    = "https://f6CbqkpuHw:CEHybx3Y2vTfsgGzo8Sw@sans-itb-7152476607.ap-southeast-2.bonsaisearch.net:443";
var elasticsearch = require('elasticsearch');
var client        = new elasticsearch.Client({
                            host: bonsai_url
                        });

export default class HomePage extends Component {

    constructor(props) {
        super(props);
        this.validateTicket = this.validateTicket.bind(this);
        this.searchAdmin = this.searchAdmin.bind(this);

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
    }

    componentDidMount() {
        this.validateTicket();
    }

    async searchAdmin(username) {
        var self = this;
        var requestBody = {
            "query": {
                "bool": {
                    "must" : {
                        "match": {
                            "username": username
                        }
                    }
                }
            }
        }
        // console.log(requestBody);
        await client.search({
            index: 'admin',
            body: requestBody
        }) 
        .then(function (res) {
            // console.log(res)
            var results = res.hits.hits;
            console.log(results);
            var rank = "";
            if (res.hits.total.value === 0) rank="umum"
            else rank = results[0]._source.rank;
            var data = {username: username, rank: rank}
            var encrypted = CryptoJS.AES.encrypt(JSON.stringify(data), "Secret Passphrase").toString();
            sessionStorage.setItem('user', encrypted);
            console.log(sessionStorage.getItem('user'));
            window.location.href = "../";
        }, function(err) {
            console.log(err)
        })
    }
    
    validateTicket() {
        const values = queryString.parse(this.props.location.search);
        var self = this;
        if (values.ticket != null && this.state.username === 'Guest') {
            axios({
                method: 'get',
                url: 'https://34.227.167.215/sso',
                params: {ticket: values.ticket},
                responseType: 'document'
            })
            .then(function (response) {
                if (response.data.all.length < 11){
                    console.log("Validation went wrong!")
                } else {
                    console.log(response.data.all[5].innerHTML);
                    console.log(response.data.all[7].innerHTML);
                    console.log(response.data.all[8].innerHTML);
                    console.log(response.data.all[10].innerHTML);
                    console.log(response.data.all[11].innerHTML);
                    var username = response.data.all[5].innerHTML
                    self.searchAdmin(username)
                }
            });
        } else {
            console.log("noticket");
        }
    }


    logout(e) {
        e.preventDefault();
        sessionStorage.removeItem('user');
        window.location.href = "https://login.itb.ac.id/cas/logout?service=https://34.227.167.215";

    }

    render() {
        return (
            <div className="home">
                <Particles className="home-background" canvasClassName="particle-canvas" params={{
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
                    <Navbar.Brand>
                        <img
                            alt=""
                            src={logoitb}
                            width="45"
                            height="45"
                            className="d-inline-block align-top mr-3"
                        />
                        SIAGA ITB
                    </Navbar.Brand>

                    <Nav className="ml-auto">
                        { this.state.rank != "umum" ? <Button className="mr-2" variant="light" href="../admin"><FiSettings
                            style={{verticalAlign: 'baseline'}}/></Button> : null}
                        { this.state.username === 'Guest' ? <Button variant="outline-light"
                                href="https://login.itb.ac.id/cas/login?service=https://34.227.167.215">Masuk</Button> :
                                <Button variant="outline-light" onClick={this.logout} >Keluar</Button>}
                    </Nav>
                </Navbar>
                <div className="home-content mt-5">
                    <Typewriter
                        options={{
                            strings: ['<h1 class="home-content-title display-1 text-center">SIAGA</h1><h1 class="home-content-subtitle display-4 text-center">Sistem Informasi Arsip Digital Statis</h1>'],
                            autoStart: true,
                            loop: true,
                            delay: 'natural',
                            cursorClassName: "home-content-cursor"
                        }}
                    />
                    <Col className="mx-auto" lg="8">
                        <Form action="../search" method="GET">
                            <InputGroup size="lg">
                                <DropdownButton
                                    as={InputGroup.Prepend}
                                    title="Filter"
                                    id="navbar-filter"
                                    variant="light"
                                >
                                    <FormCheck
                                        type="checkbox"
                                        id="tipe-gambar"
                                        name="gambar"
                                        label="Gambar"
                                        className="ml-3"
                                    />
                                    <FormCheck
                                        type="checkbox"
                                        id="tipe-tekstual"
                                        name="teks"
                                        label="Tekstual"
                                        className="ml-3"
                                    />
                                    <FormCheck
                                        type="checkbox"
                                        id="tipe-audio"
                                        name="audio"
                                        label="Audio"
                                        className="ml-3"
                                    />
                                    <FormCheck
                                        type="checkbox"
                                        id="tipe-video"
                                        name="video"
                                        label="Video"
                                        className="ml-3"
                                    />
                                    <FormCheck
                                        type="checkbox"
                                        id="tipe-lainnya"
                                        name="lainnya"
                                        label="Lainnya"
                                        className="ml-3"
                                    />
                                </DropdownButton>

                                <FormControl name="query" id="query"/>
                                <InputGroup.Append>
                                    <Button variant="light" type="submit"><FiSearch style={{verticalAlign: 'baseline'}}/></Button>
                                </InputGroup.Append>
                            </InputGroup>
                        </Form>
                    </Col>

                </div>
                <footer className="home-footer bg-dark text-light mt-4">
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