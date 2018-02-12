import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'reactstrap';
import marked from 'marked';

const ArticleView = ({
  title,
  markdown,
}) => {
  const parsedMarked = { __html: marked(markdown) };

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
  markdown: PropTypes.string.isRequired,
};

export default ArticleView;
