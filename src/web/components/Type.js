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
import ArticleContainer from '../../containers/Article';
import ArticleComponent from '../components/Article';

const TypeView = ({
  error,
  loading,
  personality,
  type,
}) => {
  // Loading
  if (loading) return <Loading />;

  // Error
  if (error) return <Error content={error} />;

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
              <ArticleContainer
                Layout={ArticleComponent}
                article={type.article}
              />
            </CardBody>
          </Card>
        </Col>
      </Row>
      <Row className="pb-3">
        <Col sm="12">
          <Link className="btn btn-secondary" to={`/personalities/${personality.id}`}><i className="icon-arrow-left" /> Back</Link>
        </Col>
      </Row>
    </div>
  );
};

TypeView.propTypes = {
  error: PropTypes.string,
  loading: PropTypes.bool.isRequired,
  personality: PropTypes.shape({}).isRequired,
  type: PropTypes.shape({}).isRequired,
};

TypeView.defaultProps = {
  error: null,
};

export default TypeView;
