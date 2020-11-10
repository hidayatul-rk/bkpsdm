import React from 'react';
import { Breadcrumb } from 'react-bootstrap';

function test1() {
    return (
        <Breadcrumb>
            <Breadcrumb.Item href="#">Home</Breadcrumb.Item>
            <Breadcrumb.Item href="https://www.republika.co.id/">Berita</Breadcrumb.Item>
            <Breadcrumb.Item active>Bola</Breadcrumb.Item>
        </Breadcrumb>
    )
}

export default test1