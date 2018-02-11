import React from 'react';
import PropTypes from 'prop-types';
import marked from 'marked';

const Article = ({
  Layout,
  article,
}) => {
  const markup = marked(article.description);

  return (
    <Layout title={article.title} markup={markup} />
  );
};

Article.propTypes = {
  Layout: PropTypes.func.isRequired,
  article: PropTypes.shape({}).isRequired,
};

export default Article;
