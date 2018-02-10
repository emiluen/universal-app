import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {
  Card,
  CardTitle,
  CardText,
  CardBody,
} from 'reactstrap';

import Error from './Error';

const PersonalityList = ({
  error,
  personalities,
}) => {
  if (error) return <Error content={error} />;

  const cards = personalities.map(item => (
    <Card key={`${item.id}`}>
      <CardBody>
        <CardTitle><Link to={`/personalities/${item.id}`}>{item.name}</Link></CardTitle>
        <CardText>{item.description}</CardText>
      </CardBody>
    </Card>
  ));

  return (
    <div>
      {cards}
    </div>
  );
};

PersonalityList.propTypes = {
  error: PropTypes.string,
  personalities: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

PersonalityList.defaultProps = {
  error: null,
};

export default PersonalityList;
