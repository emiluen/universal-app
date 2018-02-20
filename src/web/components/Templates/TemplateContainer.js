import React from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col } from 'reactstrap';

const Template = ({ children }) => (
  <Container>
    <Row>
      <Col md="10" sm="9" className="px-sm-5 py-sm-5 mx-sm-auto">
        {children}
      </Col>
    </Row>
  </Container>
);

Template.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Template;
