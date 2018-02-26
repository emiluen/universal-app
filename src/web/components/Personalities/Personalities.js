import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {
  CardDeck,
  Card,
  CardTitle,
  CardText,
  CardBody,
  CardImg,
  CardSubtitle,
  Row,
} from 'reactstrap';

import { TemplateContainer } from '../Templates/Templates';
import Error from '../Error';
import getImageUrl from '../../../selectors/get-image-url';

const PersonalityList = ({
  error,
  loading,
  personalities,
}) => {
  if (error) return <Error content={error} />;

  const cards = personalities.map(item => (
    <Card key={`${item.id}`} style={{ maxWidth: 250 }}>
      <Link to={`/personalities/${item.id}`}>
        <CardImg top src={getImageUrl(item.profileImageUrl)} alt={item.title} />
      </Link>
      <CardBody>
        <CardTitle><Link to={`/personalities/${item.id}`}>{item.name}</Link></CardTitle>
        <CardSubtitle>{item.tagline}</CardSubtitle>
        <CardText>{item.description}</CardText>
        <Link className="btn btn-primary" to={`/personalities/${item.id}/quiz`}>Test Me <i className="icon-arrow-right" /></Link>
      </CardBody>
    </Card>
  ));

  return (
    <TemplateContainer>
      <Row>
        <h1>Personality Tests</h1>
        <p>
          The following data is read directly from Firebase. The following data
          is read directly from Firebase. The following data is read directly from Firebase.
        </p>
      </Row>
      <Row className={loading ? 'content-loading' : ''}>
        <CardDeck>
          {cards}
        </CardDeck>
      </Row>
    </TemplateContainer>
  );
};

PersonalityList.propTypes = {
  error: PropTypes.string,
  loading: PropTypes.bool.isRequired,
  personalities: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

PersonalityList.defaultProps = {
  error: null,
};

export default PersonalityList;
