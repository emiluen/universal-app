import React from 'react';
import { Row, Col } from 'reactstrap';
import Link from './Link';

const Footer = () => (
  <footer className="mt-5">
    <Row>
      <Col sm="12" className="text-right pt-3">
        <p>
          Copyright © 2018 <Link link color="primary" target="_blank" rel="noopener noreferrer" href="https://emeliejavelind.com">Emelie Javelind</Link> · All Rights Reserved
        </p>
      </Col>
    </Row>
  </footer>
);

export default Footer;
