import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'reactstrap';

const ArticleView = ({
  title,
  markup,
}) => {
  const parsedMarked = { __html: markup };

  return (
    <Row>
      <Col lg="4">
        <h2>{title}</h2>
        <div dangerouslySetInnerHTML={parsedMarked} />
      </Col>
    </Row>
  );
};

ArticleView.propTypes = {
  title: PropTypes.string.isRequired,
  markup: PropTypes.string.isRequired,
};

export default ArticleView;
