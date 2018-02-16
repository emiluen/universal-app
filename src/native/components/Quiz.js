import React from 'react';
import PropTypes from 'prop-types';
import { Container, Content, H3 } from 'native-base';

import Loading from './Loading';
import Error from './Error';
import ErrorMessages from '../../constants/errors';

const Quiz = ({
  error,
  loading,
  quiz,
  personality,
}) => {
  if (loading) return <Loading />;

  // Error
  if (error) return <Error content={error} />;

  // Recipe not found
  if (!quiz || !personality) return <Error content={ErrorMessages.recipe404} />;

  return (
    <Container>
      <Content padder>
        <H3>{quiz.title}</H3>
      </Content>
    </Container>
  );
};

Quiz.propTypes = {
  error: PropTypes.string,
  loading: PropTypes.bool.isRequired,
  quiz: PropTypes.shape({}),
  personality: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }),
};

Quiz.defaultProps = {
  error: null,
  quiz: null,
  personality: null,
};

export default Quiz;
