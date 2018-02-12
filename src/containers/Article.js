import React from 'react';
import PropTypes from 'prop-types';

const Article = ({
  Layout,
  article,
}) => (
  <Layout title={article.title} markdown={article.description} />
);

Article.propTypes = {
  Layout: PropTypes.func.isRequired,
  article: PropTypes.shape({}).isRequired,
};

export default Article;
