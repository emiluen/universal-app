import React from 'react';
import PropTypes from 'prop-types';
import { Container, Content, H3, Text, Card } from 'native-base';

import ErrorMessages from '../../constants/errors';
import Loading from './Loading';
import Error from './Error';
import ArticleContainer from '../../containers/Article';
import ArticleComponent from '../components/Article';

const TypeView = ({
  error,
  loading,
  personality,
  type,
}) => {
  // Loading
  if (loading) return <Loading />;

  // Error
  if (error) return <Error content={error} />;

  // Recipe not found
  if (!type) return <Error content={ErrorMessages.recipe404} />;

  return (
    <Container>
      <Content padder>
        <H3>Type name: {type.name}</H3>
        <Text>Personality id: {personality.id}</Text>
        <Card>
          <ArticleContainer Layout={ArticleComponent} article={type.article} />
        </Card>
      </Content>
    </Container>
  );
};

TypeView.propTypes = {
  error: PropTypes.string,
  loading: PropTypes.bool.isRequired,
  personality: PropTypes.shape({}),
  type: PropTypes.shape({}),
};

TypeView.defaultProps = {
  error: null,
  personality: null,
  type: null,
};

export default TypeView;
