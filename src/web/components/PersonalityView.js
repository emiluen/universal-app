import React from 'react';
import PropTypes from 'prop-types';
import {
  Row,
  Col,
  Card,
  CardText,
  CardBody,
  CardHeader,
  ListGroup,
  ListGroupItem,
} from 'reactstrap';
import { Link } from 'react-router-dom';
import ErrorMessages from '../../constants/errors';
import Loading from './Loading';
import Error from './Error';
// import ArticleContainer from '../../containers/Article';
// import ArticleComponent from '../components/Article';

const PersonalityView = ({
  error,
  loading,
  personalities,
  personalityId,
}) => {
  // Loading
  if (loading) return <Loading />;

  // Error
  if (error) return <Error content={error} />;

  // Get this Personality from all personalities
  let personality = null;
  if (personalityId && personalities) {
    personality = personalities.find(item => item.id === personalityId);
  }

  // Personality not found
  if (!personality) return <Error content={ErrorMessages.recipe404} />;

  const typeCards = personality.types.map(type => (
    <ListGroupItem key={`${type.id}`}>
      <Link to={`/personalities/${personalityId}/types/${type.id}`}>{type.name}</Link>
    </ListGroupItem>
  ));

  return (
    <div>
      <Row>
        <Col sm="12">
          <h1>{personality.name}</h1>
        </Col>
      </Row>
      <Row>
        <Col lg="4" className="recipe-view-card">
          <Card>
            <CardHeader>Category</CardHeader>
            <CardBody>
              <CardText>{personality.tagline}</CardText>
              {/*
                <ArticleContainer
                  Component={ArticleComponent}
                  group={{}}
                  personalities={personalities}
                  personalityId={personalityId}
                />
              */}
            </CardBody>
          </Card>
        </Col>
        <Col lg="4" className="recipe-view-card">
          <Card>
            <CardHeader>Category Groups</CardHeader>
            <ListGroup className="list-group-flush">
              {typeCards}
            </ListGroup>
          </Card>
        </Col>
      </Row>
      <Row className="pb-3">
        <Col sm="12">
          <Link className="btn btn-secondary" to="/personalities"><i className="icon-arrow-left" /> Back</Link>
        </Col>
      </Row>
    </div>
  );
};

PersonalityView.propTypes = {
  error: PropTypes.string,
  loading: PropTypes.bool.isRequired,
  personalityId: PropTypes.string.isRequired,
  personalities: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

PersonalityView.defaultProps = {
  error: null,
};

export default PersonalityView;
