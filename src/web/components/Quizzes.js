import React from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  CardTitle,
  CardText,
  CardBody,
} from 'reactstrap';

import Error from './Error';

const QuizList = ({
  error,
  personalities,
}) => {
  if (error) return <Error content={error} />;

  // Build Cards for Listing
  const cards = personalities.map(item => (
    <Card key={`${item.id}`}>
      <CardBody>
        <CardTitle>{item.name}</CardTitle>
        <CardText>{item.description}</CardText>
        <CardText>
          {item.personalityMember ?
            <span>MEMBER</span>
            :
            <button onClick={() => {}}>BECOME MEMBER</button>
          }
        </CardText>
      </CardBody>
    </Card>
  ));

  return (
    <div>
      {cards}
    </div>
  );
};

QuizList.propTypes = {
  error: PropTypes.string,
  personalities: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

QuizList.defaultProps = {
  error: null,
};

export default QuizList;
