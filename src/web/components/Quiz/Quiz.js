import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import TemplateContainer from '../Templates/TemplateContainer';
import Loading from '../Loading';
import Error from '../Error';
import ErrorMessages from '../../../constants/errors';

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
    <TemplateContainer>
      <h2>{quiz.title}</h2>
      <p>{quiz.description}</p>
      <Link className="btn btn-secondary" to={`/personalities/${personality.id}`}><i className="icon-arrow-left" /> Back</Link>
    </TemplateContainer>
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
