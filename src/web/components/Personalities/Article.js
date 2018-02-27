import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Button } from 'reactstrap';
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
      <Col>
        { title ? <h5>{title}</h5> : null }
        <div dangerouslySetInnerHTML={parsedMarked} />
        { readMore ? (
          <Button outline color="primary" onClick={onToggle}>{buttonText}</Button>
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
