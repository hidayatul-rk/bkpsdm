import React, {Component} from 'react';
import {Button, Modal} from "react-bootstrap";
import "../css/admin.css"

var bonsai_url    = "https://f6CbqkpuHw:CEHybx3Y2vTfsgGzo8Sw@sans-itb-7152476607.ap-southeast-2.bonsaisearch.net:443";
var elasticsearch = require('elasticsearch');
var client        = new elasticsearch.Client({
                            host: bonsai_url,
                            log: 'trace'
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

export default class AdminCell extends Component {

    constructor(props) {
        super(props);
        this.state ={
            show: false,
            rank: this.props.rank
        };

        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleConfirm = this.handleConfirm.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    handleShow () {
        this.setState({
            show : true
        })
    }

    handleClose () {
        this.setState({
            show : false
        })
    }

    handleChange (event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        })
    }

    handleConfirm () {
        console.log("confirm");
        client.update({
            index: 'admin',
            id: this.props.id,
            body: {
                doc: {
                    rank: this.state.rank
                }
            }
        },function(err,resp,status) {
            console.log(resp);
        })
        this.setState({
            show: false
        })
    }

    handleDelete () {
        console.log("delete");
        client.delete({  
            index: 'admin',
            id: this.props.id
          },function(err,resp,status) {
              console.log(resp);
              window.location.reload();
          });
        this.setState({
            show: false
        })
    }

    render() {
        return (
            <div className="rounded shadow bg-light cell-admin m-3 p-4">
                <h6 className={"admin-username"}>{this.props.username}</h6>
                <h6 className={"admin-rank"}>{this.props.rank}</h6>
                <Button
                    className={"edit-admin-button"}
                    size={"sm"}
                    variant={"warning"}
                    onClick={this.handleShow}>
                    Edit
                </Button>
                <Modal
                    name="edit-modal"
                    show={this.state.show}
                    onHide={this.handleClose}>
                    <Modal.Header closeButton>
                      <Modal.Title>Edit Admin</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form>
                            <h6>
                                Username : <span>&nbsp;&nbsp;</span>{this.props.username}<br/>
                            </h6>
                            <label>
                                Rank <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>: <span>&nbsp;&nbsp;</span>
                                <select name="rank"
                                        value={this.state.rank}
                                        onChange={this.handleChange}
                                        id={"rank-selector"}>
                                    <option value={"admin_fakultas"}>Admin Fakultas</option>
                                    <option value={"admin_pusat"}>Admin Pusat</option>
                                </select>
                            </label>
                        </form>
                    </Modal.Body>
                    <Modal.Footer>
                      <Button name={"close-edit"} variant="secondary" onClick={this.handleClose}>
                        Close
                      </Button>
                      <Button variant="primary" onClick={this.handleConfirm}>
                        Confirm
                      </Button>
                      <Button name={"delete-button"} variant="danger" onClick={this.handleDelete}>
                        Delete
                      </Button>
                    </Modal.Footer>
                  </Modal>
            </div>
        );
    }
}