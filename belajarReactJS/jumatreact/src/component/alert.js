import React from 'react';
import { Alert } from 'react-bootstrap';

function alert() {
    return (
        <div>
            <Alert variant='primary'>This is a {} alert—check it out!</Alert>
            <Alert variant='secondary'>This is a {} alert—check it out!</Alert>
            <Alert variant='success'>This is a {} alert—check it out!</Alert>
            <Alert variant='danger'>This is a {} alert—check it out!</Alert>
            <Alert variant='warning'>This is a {} alert—check it out!</Alert>
            <Alert variant='info'>This is a {} alert—check it out!</Alert>
            <Alert variant='light'>This is a {} alert—check it out!</Alert>
            <Alert variant='dark'>This is a {} alert—check it out!</Alert>

        </div>
    )
}
export default alert