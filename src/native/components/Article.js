import React from 'react';
import PropTypes from 'prop-types';
import { WebView } from 'react-native';
import { Container, Content, H3 } from 'native-base';

const ArticleView = ({
  title,
  markup,
}) => (
  <Container>
    <Content contentContainerStyle={{ flex: 1 }}>
      <H3>{title}</H3>
      <WebView source={{ html: markup }} />
    </Content>
  </Container>
);

ArticleView.propTypes = {
  title: PropTypes.string.isRequired,
  markup: PropTypes.string.isRequired,
};

export default ArticleView;
