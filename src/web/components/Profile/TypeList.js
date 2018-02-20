import React from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import {
  Card,
  CardTitle,
  CardText,
  CardBody,
} from 'reactstrap';

const TypeList = ({ personalities }) => (
  <div>
    {personalities.map(personality => (
      <div key={`${personality.id}`}>
        <Card>
          <CardBody>
            <CardTitle>
              <Link to={`/personalities/${personality.id}`}>{personality.name}</Link>
            </CardTitle>
            <CardText>{personality.tagline}</CardText>
            <Card>
              <Link to={`/personalities/${personality.id}/types/${personality.type.id}`}>{personality.type.name}</Link>
            </Card>
          </CardBody>
        </Card>
      </div>
    ))}
  </div>
);

TypeList.propTypes = {
  personalities: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default withRouter(TypeList);
