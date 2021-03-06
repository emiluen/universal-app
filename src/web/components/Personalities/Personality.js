import React from 'react';
import PropTypes from 'prop-types';
import {
  Row,
  Col,
  Card,
  CardImg,
  CardBody,
  CardHeader,
  ListGroup,
  ListGroupItem,
} from 'reactstrap';
import { Flag } from 'flag';

import { TemplateContainer } from '../Templates/Templates';
import ErrorMessages from '../../../constants/errors';
import Loading from '../Loading';
import Error from '../Error';
import ArticleContainer from '../../../containers/Article';
import ArticleComponent from './Article';
import Link from '../Link';
import getImageUrl from '../../../selectors/get-image-url';

const PersonalityView = ({
  error,
  loading,
  personality,
}) => {
  // Loading
  if (loading) return <Loading />;

  // Error
  if (error) return <Error content={error} />;

  // Personality not found
  if (!personality) return <Error content={ErrorMessages.recipe404} />;

  const typeCards = personality.types.map(type => (
    <ListGroupItem key={`${type.id}`}>
      <div style={{ display: 'inline-block', marginRight: 12 }}>
        <img src={getImageUrl(type.coverImageUrl, { width: 80, height: 60 })} style={{ width: 80, height: 60 }} alt="Type" />
      </div>
      <Link link color="secondary" to={`/personalities/${personality.id}/types/${type.id}`}>{type.name} - {type.nickname}</Link>
    </ListGroupItem>
  ));

  return (
    <TemplateContainer>
      <Row>
        <Col xs="12" md="8">
          <Flag
            name="quizzes"
            render={() => <h1>{personality.name} - Personality Test</h1>}
            fallbackRender={() => <h1>{personality.name} - Personality Typology</h1>}
          />
          <Flag
            name="quizzes"
            render={() => (
              <Link button color="primary" to={`/personalities/${personality.id}/quiz`}>
                Take Test <i className="icon-arrow-right" />
              </Link>
            )}
          />
        </Col>
        <Col>
          <Card style={{ maxWidth: 200, marginBottom: 12 }} className="float-md-right">
            <CardImg
              src={getImageUrl(personality.profileImageUrl, { width: 200 })}
            />
          </Card>
        </Col>
      </Row>
      <Row style={{ marginTop: 40 }}>
        <Col lg="8" className="recipe-view-card">
          <Card>
            <CardBody>
              <ArticleContainer
                title
                Layout={ArticleComponent}
                article={personality.article}
              />
            </CardBody>
          </Card>
        </Col>
        <Col lg="4" className="recipe-view-card">
          <Card>
            <CardHeader>{personality.name} Personality Types</CardHeader>
            <ListGroup className="list-group-flush">
              {typeCards}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </TemplateContainer>
  );
};

PersonalityView.propTypes = {
  error: PropTypes.string,
  loading: PropTypes.bool.isRequired,
  personality: PropTypes.shape({}),
};

PersonalityView.defaultProps = {
  error: null,
  personality: null,
};

export default PersonalityView;
