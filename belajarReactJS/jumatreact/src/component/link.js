import React from 'react'
import { Alert } from 'react-bootstrap'

function link() {
    return (
        <div>

            <Alert variant='primary'>This is a PRIMARY alert with{' '}
                <Alert.Link href="#">an example link</Alert.Link>. Give it a click if you like.
            </Alert>

            <Alert variant='secondary'>This is a PRIMARY alert with{' '}
                <Alert.Link href="#">an example link</Alert.Link>. Give it a click if you like.
            </Alert>

            <Alert variant='success'>This is a PRIMARY alert with{' '}
                <Alert.Link href="#">an example link</Alert.Link>. Give it a click if you like.
            </Alert>

            <Alert variant='danger'>This is a PRIMARY alert with{' '}
                <Alert.Link href="#">an example link</Alert.Link>. Give it a click if you like.
            </Alert>

            <Alert variant='warning'>This is a PRIMARY alert with{' '}
                <Alert.Link href="#">an example link</Alert.Link>. Give it a click if you like.
            </Alert>

            <Alert variant='light'>This is a PRIMARY alert with{' '}
                <Alert.Link href="#">an example link</Alert.Link>. Give it a click if you like.
            </Alert>

            <Alert variant='dark'>This is a PRIMARY alert with{' '}
                <Alert.Link href="#">an example link</Alert.Link>. Give it a click if you like.
            </Alert>

            <Alert variant='info'>This is a PRIMARY alert with{' '}
                <Alert.Link href="#">an example link</Alert.Link>. Give it a click if you like.
            </Alert>

        </div>
    )
}

export default link