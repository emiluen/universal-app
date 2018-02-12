import React from 'react';
import PropTypes from 'prop-types';
import { Container, Content, H3, Text } from 'native-base';
import Markdown, { getUniqueID } from 'react-native-markdown-renderer';

const rules = {
  paragraph: (node, children, parent, styles) => (
    <Text key={getUniqueID()} style={[styles.paragraph]}>
      {children}
    </Text>
  ),
};

const styles = {
  paragraph: {
    paddingTop: 12,
    paddingBottom: 12,
  },
};

const ArticleView = ({
  title,
  markdown,
}) => (
  <Container>
    <Content contentContainerStyle={{ flex: 1 }}>
      <H3>{title}</H3>
      <Markdown rules={rules} style={styles}>{markdown}</Markdown>
    </Content>
  </Container>
);

ArticleView.propTypes = {
  title: PropTypes.string.isRequired,
  markdown: PropTypes.string.isRequired,
};

export default ArticleView;
