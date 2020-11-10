import React, {Component} from 'react';
import Particles from "react-particles-js";
import {Col, Container, Form, FormControl, InputGroup, Nav, Navbar, Row, Table} from "react-bootstrap";
import logoitb from "../img/logo-itb.png";
import logoppid from "../img/logo-ppid.png";
import logo100 from "../img/logo-100.png";
import nothumb from "../img/no-thumbnail.jpg";
import Button from "react-bootstrap/Button";
import {FiSearch, FiSettings} from "react-icons/fi";
import {FaFacebook, FaInstagram, FaTwitter, FaWhatsapp, FaYoutube} from "react-icons/fa";
import Pagination from "react-js-pagination";
import CryptoJS from 'crypto-js';
const qs = require('query-string');

var bonsai_url    = "https://f6CbqkpuHw:CEHybx3Y2vTfsgGzo8Sw@sans-itb-7152476607.ap-southeast-2.bonsaisearch.net:443";
var elasticsearch = require('elasticsearch');
var client        = new elasticsearch.Client({
                            host: bonsai_url
                        });

// client.ping({
//     // ping usually has a 3000ms timeout
//     requestTimeout: 1000
//     }, function (error) {
//     if (error) {
//         console.trace('elasticsearch cluster is down!');
//     } else {
//         console.log('All is well');
//     }
// });

function intersection(a, b) {
    var setA = new Set(a)
    var setB = new Set(b)
    let _intersection = new Set()
    if (setA != null && setB != null) {
        for (let elem of setB) {
            if (elem != null && setA.has(elem.toUpperCase())) {
                _intersection.add(elem)
            }
        }
    }
    // console.log("intersecting:")
    // console.log(setA)
    // console.log(setB)
    // console.log(_intersection)
    return _intersection
}

export default class ResultPage extends Component {
    
    constructor(props) {
        super(props);
        this.handlePageChange = this.handlePageChange.bind(this);
        this.handleFilterChange = this.handleFilterChange.bind(this);
        this.handleClassificationChange = this.handleClassificationChange.bind(this);
        this.searchArsip = this.searchArsip.bind(this);

        let params = qs.parse(this.props.location.search);
        if (params.query == null || params.query == "") {
            alert("Query cannot be empty");
            window.location.href = "../";
        }
        let setAllJenisTrue = false;
        if (params.gambar == null && params.teks == null && params.audio == null && params.video == null && params.lainnya == null) setAllJenisTrue = true;

        
        this.state = {     
            'username': 'Guest',
            'rank': 'umum',
            'userDetails': sessionStorage.getItem('user'),
            activePage: 1,
            //data structure: [Title, kode_arsip, skema_klasifikasi, uploaded_on, image_URL, klasifikasi_arsip, tipe_file, _id]
            buffer: [],
            filtered: [],
            data:
                [
                    ['Loading', 'Loading', 'Loading', 'Loading', "https://i.imgur.com/0kZ6C4A.jpeg", [], ["Loading"], "Loading"]
                ],
            Gambar: (params.gambar != null || setAllJenisTrue),
            Teks: (params.teks != null || setAllJenisTrue),
            Audio: (params.audio != null || setAllJenisTrue),
            Video: (params.video != null || setAllJenisTrue),
            Lainnya: (params.lainnya != null || setAllJenisTrue),
            available_klasifikasi_arsip: [],
            klasifikasi_arsip: ['PENDIDIKAN', 'PENGAJARAN', 'MAHASISWA']
        };

        //Check Session storage for user details
        var decrypted = '';
        if (this.state.userDetails != null) {
            decrypted = CryptoJS.enc.Utf8.stringify(CryptoJS.AES.decrypt(this.state.userDetails, "Secret Passphrase"));
            this.state.username = JSON.parse(decrypted).username;
            this.state.rank = JSON.parse(decrypted).rank;
        }

        if (params.query != null) {
            this.searchArsip(params)
        }
    }

    async searchArsip(params) {
        var requestBody = {
            "query" : {
                "bool": {
                    "must" : {
                        "query_string": {
                            "query": params.query
                        }
                    }
                }
            },
            "aggs" : {
                "tipe_files" : {
                    "terms" : { "field" : "tipe_file" } 
                },
                "klasifikasi_arsip": {
                    "terms" : { "field" : "klasifikasi_arsip" } 
                }
            }
        }
        if (this.state.rank == "umum") {
            requestBody.query.bool.must_not = {
                "match": {"hak_akses": "tinggi"}
            }
        } 
        // console.log(requestBody);
        var self = this;
        await client.search({
            index: 'arsip',
            body: requestBody
        }) 
        .then(function (res) {
            // console.log(res)
            var results = res.hits.hits;
            var aggs = res.aggregations.klasifikasi_arsip;
            if (aggs != null) {
                var available_klasifikasi = aggs.buckets.map(
                    function(content, index) {
                        return content.key.toUpperCase();
                    }
                )
                self.setState({available_klasifikasi_arsip: available_klasifikasi});
            };
            console.log(results);
            var buffer = [];
            buffer = results.map(
                function(content, index) {
                    var klasArsip = []
                    if (Array.isArray(content._source.klasifikasi_arsip)) klasArsip = content._source.klasifikasi_arsip
                    else klasArsip.push(content._source.klasifikasi_arsip)
                    var entry = [
                        content._source.title,
                        content._source.kode_arsip,
                        content._source.skema_klasifikasi,
                        content._source.uploaded_on,
                        content._source.image_URL,
                        klasArsip,
                        content._source.tipe_file,
                        '../detail?id=' + content._id
                    ]
                    return entry;
                }
            )
            self.setState({buffer: buffer})
            var filtered = []
            filtered = buffer.filter(
                function(content, index) {
                    var tipeFile = false;
                    if (self.state.Audio && content[6] === "suara") {tipeFile = true}
                    else if (self.state.Video && content[6] === "video") {tipeFile = true}
                    else if (self.state.Teks && content[6] === "dokumen") {tipeFile = true}
                    else if (self.state.Gambar && content[6] === "gambar") {tipeFile = true}
                    else if (self.state.Lainnya && content[6] === "lainnya") {tipeFile = true}
                    else tipeFile = false
                    if (content[5] == [] || content[5] == null) return tipeFile;
                    return ((intersection(self.state.klasifikasi_arsip, content[5]).size > 0) && tipeFile);
                }
            )
            self.setState({filtered: filtered})
            var section = filtered.slice(0, 5)
            self.setState({
                data: section
            });
        }, function(err) {
            console.log(err)
        })
    }

    handlePageChange(pageNumber) {
        // console.log(`active page is ${pageNumber}`);
        this.setState({activePage: pageNumber});
        var section = this.state.filtered.slice((pageNumber - 1)*5, pageNumber*5)
        this.setState({
            data: section
        });
    }

    handleFilterChange(e) {
        // console.log(e.target.id + "is" + e.target.checked)
        this.state[e.target.id] = e.target.checked
        // console.log(this.state[e.target.id])
        var filtered = []
        var buffer = this.state.buffer
        var self = this
        filtered = buffer.filter(
            function(content, index) {
                var tipeFile = false;
                if (self.state.Audio && content[6] === "suara") {tipeFile = true}
                else if (self.state.Video && content[6] === "video") {tipeFile = true}
                else if (self.state.Teks && content[6] === "dokumen") {tipeFile = true}
                else if (self.state.Gambar && content[6] === "gambar") {tipeFile = true}
                else if (self.state.Lainnya && content[6] === "lainnya") {tipeFile = true}
                else tipeFile = false
                if (content[5] === [] || content[5] === null) return tipeFile;
                return ((intersection(self.state.klasifikasi_arsip, content[5]).size > 0) && tipeFile);
            }
        )
        // console.log(filtered)
        this.setState({filtered: filtered})
        var section = filtered.slice(0, 5)
        this.setState({
            data: section
        });
    }

    handleClassificationChange(e) {
        console.log(e.target.id + "is" + e.target.checked)
        var arr = this.state.klasifikasi_arsip
        if (e.target.checked) arr.push(e.target.id.toUpperCase())
        else {
            var index = arr.indexOf(e.target.id);
            if (index !== -1) arr.splice(index, 1);
        }
        this.setState({klasifikasi_arsip: arr})
        console.log(this.state.klasifikasi_arsip)
        var filtered = []
        var buffer = this.state.buffer
        var self = this
        filtered = buffer.filter(
            function(content, index) {
                var tipeFile = false;
                if (self.state.Audio && content[6] === "suara") {tipeFile = true}
                else if (self.state.Video && content[6] === "video") {tipeFile = true}
                else if (self.state.Teks && content[6] === "dokumen") {tipeFile = true}
                else if (self.state.Gambar && content[6] === "gambar") {tipeFile = true}
                else if (self.state.Lainnya && content[6] === "lainnya") {tipeFile = true}
                else tipeFile = false
                if (content[5] === [] || content[5] === null) return tipeFile;
                return ((intersection(self.state.klasifikasi_arsip, content[5]).size > 0) && tipeFile);
            }
        )
        console.log(filtered)
        this.setState({filtered: filtered})
        var section = filtered.slice(0, 5)
        this.setState({
            data: section
        });
    }

    logout(e) {
        e.preventDefault();
        sessionStorage.removeItem('user');
        window.location.href = "https://login.itb.ac.id/cas/logout?service=https://34.227.167.215";

    }
    render() {

        return (
            <div className="result">
                <Particles className="result-background" canvasClassName="particle-canvas" params={{
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

                    <Nav className="ml-auto">
                        { this.state.rank != 'umum' ?<Button className="mr-2" variant="light" href="../admin"><FiSettings
                            style={{verticalAlign: 'baseline'}}/></Button> : null}
                        { this.state.username === 'Guest' ? <Button variant="outline-light"
                                href="https://login.itb.ac.id/cas/login?service=https://34.227.167.215">Masuk</Button> :
                                <Button variant="outline-light" onClick={this.logout} >Keluar</Button>}
                    </Nav>
                </Navbar>
                <div className="result-content mt-5">
                    <Col className="mx-auto" lg="10">
                        <Row>
                            <Form action="../search" method="GET" className="w-100">
                                <InputGroup size="lg">
                                    <FormControl name="query" id="query"/>
                                    <InputGroup.Append>
                                        <Button variant="light" type="submit"><FiSearch style={{verticalAlign: 'baseline'}}/></Button>
                                    </InputGroup.Append>
                                </InputGroup>
                            </Form>
                        </Row>
                        <Row className="mt-3">
                            <Col lg="4">
                                <Row className="result-filter bg-light p-4 rounded shadow-lg">
                                    <h5>Jenis Arsip</h5>
                                    <Form className="pl-4">
                                        {['Gambar', 'Teks', 'Audio', 'Video', 'Lainnya'].map((type) => (
                                            <div key={`default-${type}`} className="mb-3">
                                                <Form.Check
                                                    type='checkbox'
                                                    label={type}
                                                    id={type}
                                                    checked={this.state[type]}
                                                    onClick={this.handleFilterChange}
                                                />
                                            </div>
                                        ))}
                                    </Form>
                                </Row>
                                <Row className="result-filter bg-light p-4 mt-3 rounded shadow-lg">
                                    <h5>Klasifikasi Arsip</h5>
                                    <Form className="pl-4">
                                        {this.state.available_klasifikasi_arsip.map((type) => (
                                            <div key={`default-${type}`} className="mb-3">
                                                <Form.Check
                                                    type='checkbox'
                                                    label={type}
                                                    id={type}
                                                    checked={this.state.klasifikasi_arsip.indexOf(type) != -1}
                                                    onClick={this.handleClassificationChange}
                                                />
                                            </div>
                                        ))}
                                    </Form>
                                </Row>

                            </Col>
                            <Col className="bg-light w-100 ml-3 rounded shadow-lg p-3 pl-4">
                                <p className="lead">
                                    {this.state.filtered.length} hasil pencarian
                                </p>
                                {this.state.data.map((data, index) => (
                                    <a href={data[7]}>
                                        <div className="mb-3">
                                            <Row className="align-items-center">
                                                <Col lg="4">
                                                    <img src={data[4] === null || data[4] === '' ? nothumb : data[4]} 
                                                    className="w-100" alt=""/>
                                                </Col>
                                                <Col>
                                                    <Row className="data-title"><h5>{data[0]}</h5></Row>
                                                    <Row className="data-code"><h6>{data[1]}</h6></Row>
                                                    <Row className="data-classification"><h6>{data[2]}</h6></Row>
                                                    <Row className="data-date"><h6>{data[3]}</h6></Row>
                                                </Col>
                                            </Row>
                                        </div>
                                    </a>
                                ))}
                                <Pagination
                                    innerClass="pagination justify-content-center"
                                    hideDisabled
                                    activePage={this.state.activePage}
                                    itemsCountPerPage={5}
                                    totalItemsCount={this.state.filtered.length}
                                    pageRangeDisplayed={5}
                                    onChange={this.handlePageChange}
                                />
                            </Col>
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