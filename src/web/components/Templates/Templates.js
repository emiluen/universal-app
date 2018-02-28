import React from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col } from 'reactstrap';

export const TemplateWrapper = ({ children }) => (
  <Container fluid>
    <Row md="10" sm="9" className="px-sm-5 mx-sm-auto">
      <Col>
        {children}
      </Col>
    </Row>
  </Container>
);

TemplateWrapper.propTypes = {
  children: PropTypes.node.isRequired,
};

export const TemplateContainer = ({ children }) => (
  <TemplateWrapper>
    <Col className="py-sm-5">
      {children}
    </Col>
  </TemplateWrapper>
);

TemplateContainer.propTypes = {
  children: PropTypes.node.isRequired,
};
