import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'reactstrap';

import { TemplateContainer } from './Templates/Templates';
import Link from './Link';

const Error = ({ title, content }) => (
  <TemplateContainer>
    <Row>
      <Col lg="4">
        <h2>{title}</h2>
        <p>{content}</p>
        <p>
          <Link button color="secondary" to="/">Go Home</Link>
        </p>
      </Col>
    </Row>
  </TemplateContainer>
);

Error.propTypes = {
  title: PropTypes.string,
  content: PropTypes.string,
};

Error.defaultProps = {
  title: 'Uh oh',
  content: 'An unexpected error came up',
};

export default Error;
