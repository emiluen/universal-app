import React from 'react';
import PropTypes from 'prop-types';
import {
  Row,
  Col,
  Card,
  CardBody,
  CardHeader,
} from 'reactstrap';
import { Link } from 'react-router-dom';
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
    <div>
      <Row>
        <Col sm="12">
          <h1>{type.name}</h1>
        </Col>
      </Row>
      <Row>
        <Col lg="4" className="recipe-view-card">
          <Card>
            <CardHeader>Group</CardHeader>
            <CardBody>
              {/*
                <ArticleContainer
                  Component={ArticleComponent}
                  group={type}
                  personalities={personalities}
                  personalityId={personalityId}
                  typeId={typeId}
                />
              */}
            </CardBody>
          </Card>
        </Col>
      </Row>
      <Row className="pb-3">
        <Col sm="12">
          <Link className="btn btn-secondary" to={`/personalities/${personalityId}`}><i className="icon-arrow-left" /> Back</Link>
        </Col>
      </Row>
    </div>
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
