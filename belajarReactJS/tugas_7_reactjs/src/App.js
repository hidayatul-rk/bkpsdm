import React from 'react';
import './App.css';
import './bootstrap.min.css';
import { Container, Row, Col, Alert, Button, ButtonGroup, Badge, Image } from 'react-bootstrap';
import test1 from './halaman/test1';
// import PageCard from './page/PageCard';
function App() {
  return (
    <div>
      <Container>
        <Row>
          <Col lg="3"><Alert variant="primary">Website React Bootstrap</Alert></Col>
          <Col> </Col>
          <Col>
            <ButtonGroup size="sm">
              <Button variant="primary">Notification<Badge variant="light"> 0 </Badge>
                <span className="sr-only">unread messages</span>
              </Button>
              <Button variant="primary">Message<Badge variant="light"> 0 </Badge>
                <span className="sr-only">unread messages</span>
              </Button>
            </ButtonGroup>
          </Col>
          <Col>
            <Image src="https://banner2.kisspng.com/20180420/kuq/kisspng-computer-icons-user-clip-art-my-vector-5ad9a348cd2ce1.8035052415242125528404.jpg" width="40" />
            <Button variant="light" size="md">HRK</Button>{' '}
          </Col>
        </Row>
        <Row>
          <Col></Col>
          <Col><test1 /></Col>
        </Row>
        <Row>
          {/* <Col><PageCard /></Col> */}
        </Row>
      </Container>
    </div>
  );
}

export default App;
