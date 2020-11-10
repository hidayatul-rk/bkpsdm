import React, {Component} from 'react';
// import {Nav, Navbar, NavDropdown} from 'react-bootstrap';
import {Tab, TabList, TabPanel, Tabs} from "react-web-tabs";
import "react-web-tabs/dist/react-web-tabs.css";
import "../css/admin.css"
import PanelAdmin from "./PanelAdmin";
import PanelArsip from "./PanelArsip";
import CryptoJS from 'crypto-js';

export default class AdminPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user_details: {username: "Guest", rank: "umum"},
        };

        var enc = sessionStorage.getItem('user')
        var decrypted = '';
        if (enc != null) {
            decrypted = CryptoJS.enc.Utf8.stringify(CryptoJS.AES.decrypt(enc, "Secret Passphrase"));
            this.state.user_details = JSON.parse(decrypted);
        }
        if (this.state.user_details.rank == null || this.state.user_details.rank == "umum") {
            window.location.href = "https://34.227.167.215";
        }

        // var self = this;

    }


    render() {
        return (
            <div className="tab-admin w-100">
                <Tabs defaultTab="admin-panel" vertical className="vertical-tabs">
                    <TabList className="tab-list">
                        <Tab tabFor="admin-panel">Admin</Tab>
                        <Tab tabFor="archive-panel">Archive</Tab>
                    </TabList>

                    <TabPanel tabId="admin-panel" className="w-100">
                        <PanelAdmin rank={this.state.user_details.rank}/>
                    </TabPanel>

                    <TabPanel tabId="archive-panel" className="w-100">
                        <PanelArsip/>
                    </TabPanel>

                </Tabs>
            </div>

        );
    }
}