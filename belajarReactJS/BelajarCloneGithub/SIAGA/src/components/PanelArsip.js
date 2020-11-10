import React, {Component} from 'react';
import "react-web-tabs/dist/react-web-tabs.css";
import {Badge, Button, Col, FormControl, FormGroup, FormLabel, Modal, Row} from "react-bootstrap";
import Form from "react-bootstrap/Form";

var bonsai_url = "https://f6CbqkpuHw:CEHybx3Y2vTfsgGzo8Sw@sans-itb-7152476607.ap-southeast-2.bonsaisearch.net:443";
var elasticsearch = require('elasticsearch');
var client = new elasticsearch.Client({
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

const arrayFields = ['klasifikasi_arsip']

export default class PanelArsip extends Component {
    constructor(props) {
        super(props);
        var d = new Date();
        var s = d.toISOString().split('T')[0]
        this.state = {
            show: false,
            newArsip: {
                "hak_akses": "umum",
                "image_URL": "",
                "klasifikasi_arsip": ["Mahasiswa", "Pendidikan"],
                "kode_arsip": "AK/OA.AE.04/58",
                "media_URL": "",
                "tipe_file": "video",
                "title": "",
                "uploaded_on": s,
            },
            newField: '',
            newDetail: [],
            data: []
        };

        this.handleClose = this.handleClose.bind(this);
        this.handleShow = this.handleShow.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleNewFieldChange = this.handleNewFieldChange.bind(this);
        this.handleAddField = this.handleAddField.bind(this);
        this.handleDeleteField = this.handleDeleteField.bind(this);
        this.handleExtraFieldChange = this.handleExtraFieldChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        // this.getFileExtension = this.getFileExtension.bind(this);
        // this.formatFileSize = this.formatFileSize.bind(this);
        // this.changeLabel = this.changeLabel.bind(this);

        // var self = this;
        // client.search({
        //     index: 'arsip'
        // }) 
        // .then(function (res) {
        //     console.log(res)
        //     var results = res.hits.hits;
        //     var buffer = [];
        //     buffer = results.map(
        //         function(content, index) {
        //             return {id:content._id, 
        //                 nama: content._source.title, 
        //                 namafile: content._source.file_name, 
        //                 kodearsip: content._source.kode_arsip,
        //                 deskripsi: content._source.topik,
        //                 lokasisimpan: content._source.lokasi_penyimpanan,
        //                 ukuranfile: content._source.ukuranfile,
        //                 formatfile: content._source.formatfile,
        //                 rank: content._source.hak_akses};
        //         }
        //     )
        //     self.setState({data: buffer})
        // }, function(err) {
        //     console.log(err)
        // })
    }

    handleShow() {
        if (this.state.show === false) {
            this.setState({
                show: false,
                nama: "",
                namafile: "",
                kodearsip: "",
                deskripsi: "",
                lokasisimpan: "",
                ukuranfile: "",
                formatfile: "",
                rank: "terbuka"
            })
        }
        this.setState({show: true});
        console.log("show modal");
    }

    handleClose() {
        this.setState({show: false});
        console.log("hide modal");
    }

    handleChange(event) {
        const target = event.target;
        var value = target.value;
        const name = target.name;

        if (document.getElementById("kode_arsip").value == null ||
            document.getElementById("kode_arsip").value == "" ||
            document.getElementById("title").value == null ||
            document.getElementById("title").value == "") {
            document.getElementById("confirm-button").disabled = true;
        } else {
            document.getElementById("confirm-button").disabled = false;
        }

        if (arrayFields.includes(name)) {
            value = value.split(',');
            var x;
            for (x in value) {
                value[x] = value[x].trim()
            }
        }

        var newArsip = this.state.newArsip
        newArsip[name] = value
        this.setState({
            newArsip: newArsip
        })
    }

    handleSubmit() {
        if (document.getElementById("confirm-button").disabled != true) {
            this.setState({show: false});
            var newArsip = this.state.newArsip
            var newDetail = this.state.newDetail;
            var x;
            for (x in newDetail) {
                newArsip[newDetail[x][0]] = newDetail[x][1]
            }
            client.index({
                index: 'arsip',
                body: newArsip
            }, function (err, resp, status) {
                console.log(resp);
                window.location.reload();
            });
            console.log("submit");
        }
    }

    // getFileExtension(filename) {
    //     return filename.slice((filename.lastIndexOf(".") - 1 >>> 0) + 2);
    // }

    // formatFileSize(bytes, decimalPoint) {
    //     if (bytes == 0) return '0 Bytes';
    //     var k = 1024,
    //         dm = decimalPoint || 2,
    //         sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
    //         i = Math.floor(Math.log(bytes) / Math.log(k));
    //     return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    // }

    // changeLabel() {
    //     var name = document.getElementById('customFile');
    //     if (name.files.item(0) != null) {
    //         this.setState({ file_name: name.files.item(0).name });
    //         this.setState({ ukuranfile: this.formatFileSize(name.files.item(0).size) });
    //         this.setState({ formatfile: this.getFileExtension(name.files.item(0).name) });
    //         document.getElementById('file_name').innerHTML = name.files.item(0).name;
    //     } else {
    //         this.setState({ file_name: "" });
    //         this.setState({ ukuranfile: "" });
    //         this.setState({ fomatfile: "" });
    //         document.getElementById('file_name').innerHTML = "Choose file";
    //     }
    // }

    handleExtraFieldChange(event) {
        const target = event.target;
        const name = target.name;
        const value = target.value;
        const id = target.id.split(':')[1];
        console.log(target)

        console.log("changing index: " + id + "w/ value:" + [name, value])

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

    render() {
        const data = this.state.data
        return (
            <div className="panel-arsip p-5 w-100">
                <Button variant="primary" size="lg" block id={"add-arsip-button"} onClick={this.handleShow}>
                    + Tambah Arsip
                </Button>
                <Modal show={this.state.show} onHide={this.handleClose} size="lg">
                    <Modal.Header closeButton>
                        <Modal.Title>Tambah Arsip</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <FormGroup as={Row}>
                                <FormLabel column sm="5">Kode Arsip : <Badge pill
                                                                             variant="danger">required</Badge></FormLabel>
                                <Col sm="7">
                                    <FormControl
                                        name="kode_arsip"
                                        id="kode_arsip"
                                        type="text"
                                        placeholder={this.state.newArsip.kode_arsip}
                                        onChange={this.handleChange}/>
                                </Col>
                            </FormGroup>
                            <FormGroup as={Row}>
                                <FormLabel column sm="5">Judul Arsip : <Badge pill
                                                                              variant="danger">required</Badge></FormLabel>
                                <Col sm="7">
                                    <FormControl
                                        name="title"
                                        id="title"
                                        type="text"
                                        placeholder={this.state.newArsip.title}
                                        onChange={this.handleChange}/>
                                </Col>
                            </FormGroup>
                            <FormGroup as={Row}>
                                <FormLabel column sm="5">Hak Akses : <Badge pill
                                                                            variant="danger">required</Badge></FormLabel>
                                <Col sm="7">
                                    <FormControl as="select" name="hak_akses"
                                                 value={this.state.newArsip.hak_akses}
                                                 onChange={this.handleChange}
                                    >
                                        <option value={"umum"}>Umum</option>
                                        <option value={"tinggi"}>Tinggi</option>
                                        <option value={"tertinggi"}>Tertinggi</option>
                                    </FormControl>
                                </Col>
                            </FormGroup>
                            <FormGroup as={Row}>
                                <FormLabel column sm="5">Klasifikasi : </FormLabel>
                                <Col sm="7">
                                    <FormControl
                                        name="klasifikasi_arsip"
                                        type="text"
                                        placeholder={this.state.newArsip.klasifikasi_arsip}
                                        onChange={this.handleChange}/>
                                </Col>
                            </FormGroup>
                            <FormGroup as={Row}>
                                <FormLabel column sm="5">Tipe Arsip : <Badge pill
                                                                             variant="danger">required</Badge></FormLabel>
                                <Col sm="7">
                                    <FormControl as="select" name="tipe_file"
                                                 value={this.state.newArsip.tipe_file}
                                                 onChange={this.handleChange}
                                    >
                                        <option value={"teks"}>Teks</option>
                                        <option value={"video"}>Video</option>
                                        <option value={"audio"}>Audio</option>
                                        <option value={"gambar"}>Gambar</option>
                                        <option value={"lainnya"}>Lainnya</option>
                                    </FormControl>
                                </Col>
                            </FormGroup>
                            {this.state.newDetail.map(
                                (content, index) => (
                                    <FormGroup as={Row} className="mx-auto">
                                        <FormLabel column sm="5">{content[0]} : </FormLabel>
                                        <Col sm="5">
                                            <FormControl
                                                id={"no:" + index}
                                                name={content[0]}
                                                type="text"
                                                value={content[1]}
                                                onChange={this.handleExtraFieldChange}/>
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
                        <Button id="confirm-button" variant="primary" onLoad={this.handleChange} onClick={this.handleSubmit}>
                            Confirm
                        </Button>
                    </Modal.Footer>
                </Modal>

            </div>
        );
    }
}