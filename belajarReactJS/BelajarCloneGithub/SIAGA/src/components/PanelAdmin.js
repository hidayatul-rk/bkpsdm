import React, {Component} from 'react';
import "react-web-tabs/dist/react-web-tabs.css";
import {Badge, Button, Col, FormControl, FormGroup, FormLabel, Modal, Row} from "react-bootstrap";
import AdminCell from "./AdminCell";
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

export default class PanelAdmin extends Component {

    constructor(props) {
        super(props);
        this.state = {
            show: false,
            username: "",
            rank: "admin_fakultas",
            data: []
        };

        this.handleClose = this.handleClose.bind(this);
        this.handleShow = this.handleShow.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        var self = this;
        client.search({
            index: 'admin'
        })
            .then(function (res) {
                console.log(res)
                var results = res.hits.hits;
                var buffer = [];
                buffer = results.map(
                    function (content, index) {
                        return {id: content._id, username: content._source.username, rank: content._source.rank};
                    }
                )
                self.setState({data: buffer})
            }, function (err) {
                console.log(err)
            })
    }

    handleShow() {
        this.setState({show: true});
        console.log("show modal")
    }

    handleClose() {
        this.setState({show: false});
        console.log("hide modal")
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        if (name == "username" && (value == null || value == "")) {
            document.getElementById("confirm-button").disabled = true;
        } else {
            document.getElementById("confirm-button").disabled = false;
        }
        this.setState({
            [name]: value
        })
    }

    handleSubmit() {
        
            console.log("submit");
            client.index({
                index: 'admin',
                body: {
                    "username": this.state.username,
                    "rank": this.state.rank
                }
            }, function (err, resp, status) {
                console.log(resp);
                window.location.reload();
            });
            this.setState({
                show: false
            })
        
    }

    render() {
        const data = this.state.data
        if (this.props.rank === null || this.props.rank === "admin_fakultas") {
            return(
                <div className="panel-admin p-5 w-100">
                    Admin Fakultas tidak diperbolehkan mengatur admin lain
                </div>
            )
        }
        return (
            <div className="panel-admin p-5 w-100">
                <Button variant="primary" size="lg" block id={"add-admin-button"} onClick={this.handleShow}>
                    + Tambah Admin
                </Button>
                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Tambah Admin</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <FormGroup as={Row}>
                                <FormLabel column sm="5">Username : <Badge pill
                                                                           variant="danger">required</Badge></FormLabel>
                                <Col sm="7">
                                    <FormControl
                                        name="username"
                                        type="text"
                                        value={this.state.username}
                                        onChange={this.handleChange}/>
                                </Col>
                            </FormGroup>
                            <FormGroup as={Row}>
                                <FormLabel column sm="5">Rank : <Badge pill
                                                                       variant="danger">required</Badge></FormLabel>
                                <Col sm="7">
                                    <FormControl as="select" name="rank"
                                                 value={this.state.rank}
                                                 onChange={this.handleChange}
                                                 id={"rank-selector"}>
                                        <option value={"admin_fakultas"}>Admin Fakultas</option>
                                        <option value={"admin_pusat"}>Admin Pusat</option>
                                    </FormControl>
                                </Col>
                            </FormGroup>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleClose}>
                            Close
                        </Button>
                        <Button id="confirm-button" variant="primary" onClick={this.handleSubmit} onLoad={this.handleChange}>
                            Confirm
                        </Button>
                    </Modal.Footer>
                </Modal>
                <div>
                    {data.map(
                        (content, index) => {
                            return (
                                <AdminCell id={content.id} username={content.username} rank={content.rank}></AdminCell>)
                        }
                    )}
                </div>
            </div>
        );
    }
}