import React from 'react';
import PropTypes from 'prop-types';
import { Container, Content, H3, Text } from 'native-base';

import ErrorMessages from '../../constants/errors';
import Loading from './Loading';
import Error from './Error';
// import ArticleContainer from '../../containers/Article';
// import ArticleComponent from './Article';

const TypeView = ({
  error,
  loading,
  personalities,
  personalityId,
  typeId,
}) => {
  // Loading
  if (loading) return <Loading />;

  // Error
  if (error) return <Error content={error} />;

  // Get this Type from all personality types
  let type = null;
  if (personalityId && typeId && personalities) {
    const personality = personalities.find(item => item.id === personalityId);

    if (!personality) return <Error content={ErrorMessages.recipe404} />;

    type = personality.types.find(item => item.id === typeId);
  }

  // Recipe not found
  if (!type) return <Error content={ErrorMessages.recipe404} />;

  return (
    <Container>
      <Content padder>
        <H3>Type name: {type.name}</H3>
        <Text>Personality id: {personalityId}</Text>
      </Content>
    </Container>
  );
};

TypeView.propTypes = {
  error: PropTypes.string,
  loading: PropTypes.bool.isRequired,
  personalities: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  typeId: PropTypes.string.isRequired,
  personalityId: PropTypes.string.isRequired,
};

TypeView.defaultProps = {
  error: null,
};

export default TypeView;
