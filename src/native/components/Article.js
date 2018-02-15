import React from 'react';
import PropTypes from 'prop-types';
import { View, H3, Text, Button, Row, Right } from 'native-base';
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
  onToggle,
  buttonText,
  readMore,
}) => (
  <View>
    { title ? <H3>{title}</H3> : null }
    <Markdown rules={rules} style={styles}>{markdown}</Markdown>
    { readMore ? (
      <Row>
        <Right>
          <Button transparent primary onPress={onToggle}>
            <Text>{buttonText}</Text>
          </Button>
        </Right>
      </Row>
    ) : null }
  </View>
);

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
