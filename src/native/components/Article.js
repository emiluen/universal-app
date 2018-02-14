import React from 'react';
import PropTypes from 'prop-types';
import { View, H3, Text, Button } from 'native-base';
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
  <View>
    <H3>{title}</H3>
    <Markdown rules={rules} style={styles}>{markdown}</Markdown>
    <Button transparent primary>
      <Text>Read More</Text>
    </Button>
  </View>
);

ArticleView.propTypes = {
  title: PropTypes.string.isRequired,
  markdown: PropTypes.string.isRequired,
};

export default ArticleView;
