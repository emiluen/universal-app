import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'reactstrap';
import marked from 'marked';

const ArticleView = ({
  title,
  markdown,
  onToggle,
  buttonText,
  readMore,
}) => {
  const parsedMarked = { __html: marked(markdown) };

  return (
    <Row>
      <Col lg="4">
        { title ? <h2>{title}</h2> : null }
        <div dangerouslySetInnerHTML={parsedMarked} />
        { readMore ? (
          <button onClick={onToggle}>{buttonText}</button>
        ) : null }
      </Col>
    </Row>
  );
};

ArticleView.propTypes = {
  title: PropTypes.string,
  markdown: PropTypes.string.isRequired,
  onToggle: PropTypes.func.isRequired,
  buttonText: PropTypes.string.isRequired,
  readMore: PropTypes.bool,
};

ArticleView.defaultProps = {
  title: null,
  readMore: null,
};

export default ArticleView;
