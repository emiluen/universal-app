import React from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import {
  CardDeck,
  Card,
  CardTitle,
  CardSubtitle,
  CardImg,
  CardBody,
} from 'reactstrap';

import getImageUrl from '../../../selectors/get-image-url';

const TypeList = ({ personalities }) => (
  <CardDeck>
    {personalities.map(personality => (
      <Card key={`${personality.id}`} style={{ maxWidth: 250 }}>
        <Link to={`/personalities/${personality.id}/types/${personality.type.id}`}>
          <CardImg
            top
            src={getImageUrl(personality.type.coverImageUrl, { height: 180 })}
            alt={personality.type.name}
            style={{ height: 180, objectFit: 'cover' }}
          />
        </Link>
        <CardBody>
          <CardTitle>
            <Link to={`/personalities/${personality.id}/types/${personality.type.id}`}>
              {personality.type.name} - {personality.type.nickname}
            </Link>
          </CardTitle>
          <CardSubtitle>
            <Link to={`/personalities/${personality.id}`}>
              {personality.name} Personality Type
            </Link>
          </CardSubtitle>
        </CardBody>
      </Card>
    ))}
  </CardDeck>
);

TypeList.propTypes = {
  personalities: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default withRouter(TypeList);
